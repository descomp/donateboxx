import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Button, ButtonGroup, Col, Container, Form, Row } from "react-bootstrap";

import '../css/style.css';
import '../images/mdi/css/materialdesignicons.min.css'

// TODO write out this login page
export default function LoginPage() {
    const { loginData, loginRequest, logoutRequest } = useOutletContext();
    const [createAccountMode, setCreateAccountMode] = useState(false);
    const [username, setUsername] = useState(loginData?.username ?? "");
    const [password, setPassword] = useState(loginData?.password ?? "");
    const [email, setEmail] = useState((createAccountMode && !!loginData?.email) ?? "");
    const [phone, setPhone] = useState((createAccountMode && !!loginData?.password) ?? "");

    const [jsonData, setJsonData] = useState("");

    const onFormSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        setJsonData(formDataObj);
        console.debug(formDataObj);
    }

    const checkValidity = (username, password) => {
        return !!username && !!password;
    };
    const isValid = checkValidity(username, password);

    const makeLoginRequest = () => {
        const data = {
            username: jsonData.username,
            password: jsonData.password,
            email: jsonData.email,
            phone: jsonData.phone,
        }
        if (!createAccountMode) {
            if (data.email) delete data.email;
            if (data.phone) delete data.phone;
        }
        console.debug(data);
        loginRequest(data);
    };

    return (
        <Container fluid id="login-page">
            <Container style={{"display": "none"}} className="mx-auto">
                <h3>Secret login and create button testers!</h3>
                <Button 
                    variant="info"
                    onClick={() => {
                        loginRequest({
                            username: "adamw",
                            password: "1234",
                        })
                }}>Test login button</Button>
                <Button 
                    variant="info"
                    onClick={() => {
                        loginRequest({
                            username: "5476723746764745756",
                            password: "dfsgthstdhdghsgfhsfghdfghdfgh",
                        })
                }}>Test a (most likely) invalid login button</Button>
                <Button
                    variant="info"
                    onClick={() => {
                        loginRequest({
                            username: "adamw",
                            password: "1234",
                            email: "aw@potato.com",
                            phone: "1234567890"
                        })
                }}>Test create user button</Button>
                <Button 
                    variant="info"
                    onClick={() => {
                        logoutRequest()
                }}>Test logout button</Button>
            </Container>
            <Row>
                <Container className="banner" style={{ background: '#FAF6F6', paddingTop: '32px', paddingBottom: '32px' }}>
                    <h3 className="font-weight-semibold">{createAccountMode ? "Create Account" : "Login"}</h3>
                    <span className="pb-5">
                        {createAccountMode ? "Please create an account using the below fields." : "Please login to your user account with a username and password."}
                    </span>
                </Container>
            </Row>
            <br />
            {/* signature: (username TEXT not null, email TEXT not null, phone TEXT, personable BOOLEAN DEFAULT FALSE, organized BOOLEAN DEFAULT FALSE, note TEXT) */}
            <Container style={{ backgroundColor: '#f9f9f9' }}>
                <Row className="justify-content-md-center" style={{ marginTop: '32px', marginBottom: '64px' }}>
                    <Col sm='10' md='9' lg='6'>
                        <ButtonGroup className="d-flex justify-content-md-center">
                            <Button
                                variant="info"
                                active={!createAccountMode}
                                className={(!createAccountMode ? "focus" : "") + " ml-sm-1"}
                                onClick={() => setCreateAccountMode(false)}>Login
                            </Button>
                            <Button
                                variant="secondary"
                                active={createAccountMode}
                                className={(createAccountMode ? "focus" : "") + " ml-sm-1"}
                                onClick={() => setCreateAccountMode(true)}>Create A New Account
                            </Button>
                            <Button
                                variant="warning"
                                className="ml-sm-1"
                                onClick={() => logoutRequest()}>Logout
                            </Button>
                        </ButtonGroup>
                        <p id="feedback-zone" className="well" style={{marginBottom: "1em"}}></p>
                        <Form onSubmit={onFormSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    value={username}
                                    name="username"
                                    type="name"
                                    placeholder="Enter username"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password || ""}
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </Form.Group>

                            {createAccountMode && <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                    value={phone || ""}
                                    name="phone"
                                    type="number"
                                    placeholder="Enter phone number"
                                />
                            </Form.Group>}

                            {createAccountMode && <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email || ""}
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>}

                            <Button
                                style={{ width: '100%' }}
                                variant="info"
                                type="submit"
                                disabled={!isValid}
                                onClick={makeLoginRequest}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
