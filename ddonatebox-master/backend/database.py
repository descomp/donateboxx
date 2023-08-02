import sqlite3 
  
class Database:
    def __init__(self, path):
        self.conn = sqlite3.connect(path)
        c = self.conn.cursor()
        # Help instantiate the database if tables don't exist yet!
        c.execute(
            "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT not null, encrypted_password BYTES not null, email TEXT not null, phone TEXT);"
        )
        c.execute(
            "CREATE TABLE IF NOT EXISTS volunteer_forms(id INTEGER PRIMARY KEY, username TEXT not null, email TEXT not null, phone TEXT, personable BOOLEAN DEFAULT FALSE, organized BOOLEAN DEFAULT FALSE, note TEXT);"
        )
        c.execute(
            "CREATE TABLE IF NOT EXISTS donations(id INTEGER PRIMARY KEY, amount REAL not null, name TEXT not null, email TEXT, phone TEXT, note TEXT);"
        )

    def select(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        return c.fetchall()

    def execute(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        self.conn.commit()
        return c.lastrowid

    def close(self):
        self.conn.close()

    # --- QUERIES ---

    # --- USERS ---
    def create_user(self, username, encrypted_password, email, phone):
        return self.execute(
            "INSERT INTO users (username, encrypted_password, email, phone) VALUES (?, ?, ?, ?)",
            [username, encrypted_password, email, phone],
        )

    def get_user(self, username, with_encrypted_password=False):
        data = self.select("SELECT * FROM users WHERE username = ?;", [username])
        if data:
            d = data[0]
            retval = {
                "username": d[1],
                "phone": d[4],
                "email": d[3],
            }
            # Only getting encrypted password if confirming login
            # Could go further and select less from the database conditionally,
            # at which point would be good to get out of this #-indexing setup
            if with_encrypted_password:
                retval.update({"encrypted_password": d[2]})
            return retval
        else:
            return None

    # --- VOLUNTEER ---
    
    def get_volunteer_form(self, username, email):
        """
        Get the last (by pk id) volunteer form submitted for some username.
        For our purposes, simpler than managing foreign keys and updating existing submissions!
        Could use this to check if someone already has submitted a form, and remind them after they submit,
        like "Got your new form, we will use your most recent submission."
        There's other issues to acknowledge with this, like that the usernames or other fields are not certified unique.
        """
        form_data = self.select(
            "SELECT username, email, phone, personable, organized, note FROM volunteer_forms WHERE username = ? and email = ? ORDER BY id DESC;",
            [username, email],
        )
        if form_data:
            form_data = form_data[0]
            return {
                "username": form_data[0],
                "email": form_data[1],
                "phone": form_data[2],
                "personable": bool(form_data[3]),
                "organized": bool(form_data[4]),
                "note": form_data[5],
            }
        else:
            return None

    def add_volunteer_form(
        self,
        username,
        email,
        phone,
        personable=False,
        organized=False,
        note="",
    ):
        return self.execute(
            "INSERT INTO volunteer_forms (username, email, phone, personable, organized, note) VALUES (?, ?, ?, ?, ?, ?)",
            [username, email, phone, personable, organized, note],
        )

    # --- DONATION ---
    
    def add_donation(self, amount, name, email, phone, note=""):
        """
        Name can be the same as username...
        TODO maybe make it so you only need either phone or email as contact information from the database perspective
        ...but also I am not sure what features are or aren't interesting to add like that
        """
        return self.execute(
            "INSERT INTO donations (amount, name, email, phone, note) VALUES (?, ?, ?, ?, ?)",
            [amount, name, email, phone, note],
        )
