import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import Logo from "./images/logo.png";

import pattern1 from "./images/pattern1.webp";

export default function NavBar({
  loginData,
  setLoginData,
  loginRequest,
  logoutRequest,
}) {
  // todo add a real logo
  // todo extract css maybe, this is hard to read/ugly!
  return (
    <>
      <style type="text/css">
        {`
    #nav {
        background-color: aliceblue;
    }
        `}
      </style>
      <Navbar
        activekey="/"
        className="justify-content-center"
        id="nav"
        bg="light"
        style={{ backgroundImage: `url(${pattern1})` }}
        expand="lg"
      >
        <Container className="justify-content-center">
          <Link to="/" className="nav-link d-none d-lg-block">
            <Navbar.Brand>
              {/* todo New logo */}
              <img
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=""
              />{" "}
              <span className="d-none d-lg-inline">Donate Box</span>
            </Navbar.Brand>
          </Link>

          <Nav fill>
            <Nav.Item>
              <Link to="/" eventkey="home" className="nav-link">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/aboutus" eventkey="aboutus" className="nav-link">
                About Us
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/volunteer" eventkey="volunteer" className="nav-link">
                Volunteer
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/donate" eventkey="donate" className="nav-link">
                Donate
              </Link>
            </Nav.Item>
            <Nav.Item disabled className="d-none d-lg-block">
              <Nav.Link disabled className="d-none d-lg-block">|</Nav.Link>
            </Nav.Item>
            {!loginData?.username && (
              <Nav.Item>
                <Link to="/login" eventkey="login" className="nav-link">
                  <span>Login</span>
                </Link>
              </Nav.Item>
            )}
            {loginData?.username && (
              <Nav.Item className="nav-link d-none d-sm-block" disabled>
                Logged in as <b>{loginData.username}</b>
              </Nav.Item>
            )}
            {loginData?.username && (
              <Nav.Item>
                <Link eventkey="logout" className="nav-link">
                  <span onClick={() => logoutRequest()}>Logout</span>
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
