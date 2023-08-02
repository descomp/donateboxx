import re
from base64 import b64decode, b64encode
from json import dumps as jsondumps

from flask import (
    Flask,
    Response,
    current_app,
    g,
    jsonify,
    make_response,
    render_template,
    request,
    session,
    url_for,
)
from flask_cors import CORS

from .database import Database

# --- FLASK/DB INIT ---
app = Flask(__name__)
DATABASE_PATH = "donatebox.db"
app.config["DATABASE"] = DATABASE_PATH
app.secret_key = b'_5#y2L"F4Q8z\n\xfc]/'  # would be in s3 realistically
CORS(app)  # not production style here


def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = Database(DATABASE_PATH)
    return db


@app.teardown_appcontext
def close_db(exc=None):
    db = getattr(g, "_database", False)

    if db:
        db.close()


ENCODING = "utf-8"
PHONE_REGEXP = re.compile(r"^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$")
EMAIL_REGEXP = re.compile(
    r"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
)


def _encrypt(value: str) -> bytes:
    if type(value) is not bytes:
        if app.debug:
            print(f"Casting '{value}' to bytes typing")
        value = bytes(value, ENCODING)
    return b64encode(value)


def _decrypt(value: bytes) -> str:
    if type(value) is not bytes and app.debug:
        print("Something might be up with the _decrypt method, see arg:", value)
    return b64decode(value).decode(ENCODING)


def _generate_response(json: dict, statusCode: int) -> Response:
    """
    Since there's a lot of changing in how best to do responses over time,
    extract it to a method where it can be updated everywhere more easily.
    Same goes for other helper methods.
    """
    assert json.get("error") or json.get(
        "message"
    ), "Expected to have either an error or info message!"
    return Response(jsondumps(json), status=statusCode)


def _password_quality_adequate(typed_password: str) -> tuple:
    """
    Really lowballing the password quality checking for the
    goals of this project. Extracted to a method here as an
    example of where more qualities could be enforced on the
    backend. Can also keep the error message updated here.

    @returns (Boolean of passability, message if not good enough)
    """
    return (
        len(typed_password) >= 4,
        "Please add a password with at least four characters.",
    )


def _serialize_user(user):
    """
    Omit password content when sending back response data.
    """
    return {
        "username": user.get("username"),
        "email": user.get("email"),
        "phone": user.get("phone"),
    }


@app.post("/create_user")
def create_user():
    # uncomment the following to step into the debugger (or add it elsewhere)
    # breakpoint()

    json = request.get_json()
    username = json.get("username")
    typed_password = json.get("password")
    phone = json.get("phone")
    email = json.get("email")

    if not username:
        return _generate_response({"error": "Please type in your username."}, 400)
    if not typed_password:
        return _generate_response({"error": "Please type in your password."}, 400)
    if not email:
        return _generate_response({"error": "Please type in your email address."}, 400)
    # Note: no phone is acceptable behavior here.

    adequate_password, inadequate_password_error = _password_quality_adequate(
        typed_password
    )
    if not adequate_password:
        return _generate_response({"error": inadequate_password_error}, 411)

    # If they DO add a phone number, use an incredibly generous matcher to validate it.
    # The message is really reaching about how they'd mess up. Like, "CAR-1234" isn't okay!
    if phone and not PHONE_REGEXP.search(str(phone)):
        return _generate_response(
            {
                "error": "Please enter a valid phone number using digits and with an area code."
            },
            400,
        )

    if email and not EMAIL_REGEXP.search(str(email)):
        return _generate_response({"error": "Please enter a valid email address."}, 400)

    if username and typed_password and phone and email:
        user_exists = get_db().get_user(username)
        if user_exists:
            return _generate_response(
                {"error": "A user with this username already exists."}, 409
            )

        encrypted_password = _encrypt(typed_password)
        get_db().create_user(username, encrypted_password, email, phone)
        user = get_db().get_user(username)
        session["user"] = user
        return _generate_response(
            {"message": "Created user successfully.", **_serialize_user(user)}, 201
        )
    # GET requests handled by react router, so we should only get here if
    # we are missing form data
    return _generate_response({"error": "Missing necessary form data."}, 400)


@app.post("/login")
def login():
    json = request.get_json()
    username = json.get("username")
    typed_password = json.get("password")
    if not username:
        return _generate_response({"error": "Please type in your username."}, 400)
    if not typed_password:
        return _generate_response({"error": "Please type in your password."}, 400)
    # `else if username and typed_password:`
    user = get_db().get_user(username, with_encrypted_password=True)  # for validation
    if not user:
        return _generate_response({"error": "User account resource not found."}, 404)
    # could be that other pbkdf2_sha256 but you get the idea
    if _decrypt(user["encrypted_password"]) == typed_password:
        # Update and store on the session variable
        # Overwrite login if we were already logged in
        session["user"] = get_db().get_user(username)
        return _generate_response(
            {"message": "Logged in successfully.", **_serialize_user(user)}, 200
        )
    else:
        return _generate_response(
            {"error": "Inadequate username and password pairing for authentication."},
            401,
        )


@app.post("/logout")
def logout():
    if bool(session.pop("user", None)):
        return _generate_response({"message": "Logged out!"}, 200)
    else:  # No user logged in, slightly different here.
        return _generate_response({"message": "Logged out."}, 204)


@app.post("/donate")
def donate_form():
    """
    Reminder signature: ```
    donations (amount, name, email, phone, note)
    """
    json = request.get_json()
    amount = json.get("amount")
    name = json.get("name")  # can also be username or they can change it
    email = json.get("email")
    phone = json.get("phone")
    note = json.get("note", "")
    if not amount or amount <= 0:
        return _generate_response({"error": "Please enter a valid amount."}, 400)
    if not email and not phone:
        return _generate_response(
            {"error": "Please add contact information: your phone and/or email."}, 400
        )
    if not name:
        return _generate_response(
            {"error": "Please add your name (this can be your username)."}, 400
        )

    if phone and not PHONE_REGEXP.match(str(phone)):
        return _generate_response(
            {
                "error": "Please enter a valid phone number using digits and with an area code."
            },
            400,
        )

    if email and not EMAIL_REGEXP.search(str(email)):
        return _generate_response({"error": "Please enter a valid email address."}, 400)

    # sqllite3 apparently doesn't have default limits on text length,
    # but let's add SOME generous upper limit.
    if note and len(str(note)) >= 15000:
        return _generate_response(
            {"error": "Sorry, please limit notes to 15,000 characters in length."}, 413
        )

    try:
        retval = get_db().add_donation(amount, name, email, phone, note)
    except Exception as e:
        # Unknown error occurred.
        print(e, flush=True)
        return _generate_response(
            {"error": "Something went wrong."},
            500,
        )
    else:
        print("Successful donation", retval)
        return _generate_response(
            {"message": "Successfully posted donation payment. Thank you!"},
            201,
        )


@app.post("/volunteer")
def volunteer_form():
    """
    Reminder signature: ```return self.execute(
        "INSERT INTO volunteer_forms (username, email, phone, personable, organized, note) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, email, phone, personable, organized, note],
    )```
    """
    json = request.get_json()
    username = json.get("username")
    email = json.get("email")
    phone = json.get("phone")

    personable = json.get("personable", False)
    if personable == "true":
        personable = True
    elif personable == "false":
        personable = False

    organized = json.get("organized", False)
    if organized == "true":
        organized = True
    elif organized == "false":
        organized = False

    note = json.get("note", "")

    if not username:
        return _generate_response({"error": "Please type in your username."}, 400)
    if not email and not phone:
        return _generate_response(
            {"error": "Please add contact information, phone or email."}, 400
        )

    has_submitted_prior = get_db().get_volunteer_form(username, email)

    if phone and not PHONE_REGEXP.match(str(phone)):
        return _generate_response(
            {
                "error": "Please enter a valid phone number using digits and with an area code."
            },
            400,
        )

    if email and not EMAIL_REGEXP.search(str(email)):
        return _generate_response({"error": "Please enter a valid email address."}, 400)

    try:
        retval = get_db().add_volunteer_form(
            username, email, phone, personable, organized, note
        )
    except Exception as e:
        # Unknown error occurred.
        print(e, flush=True)
        return _generate_response(
            {"error": "Something went wrong."},
            500,
        )
    else:
        print("Successful volunteer form submission", retval)
        message = (
            "Updated your latest volunteer form submission."
            if has_submitted_prior
            else "Successfully submitted your volunteer form."
        )
        return _generate_response(
            {"message": message},
            201,
        )
