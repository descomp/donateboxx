import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, ButtonGroup, Col, Container, Form, Modal, Row } from "react-bootstrap";

import '../css/style.css';
import '../images/mdi/css/materialdesignicons.min.css'

export default function VolunteerPage() {
    const {loginData, volunteerRequest} = useOutletContext();

    const [username, setUsername] = useState(loginData?.username ?? "");
    const [email, setEmail] = useState(loginData?.email ?? "");
    const [phone, setPhone] = useState((loginData?.phone ?? "").replace(/\D/g,''));
    const [personable, setPersonable] = useState(false);
    const [organized, setOrganized] = useState(false);
    // const [note, setNote] = useState("");
    const [show, setShow] = useState(false);
    const [jsonData, setJsonData] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onFormSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('personable', personable);
        formData.append('organized', organized);
        const formDataObj = Object.fromEntries(formData.entries());
        setJsonData(formDataObj);
        console.debug(formDataObj);
    }

    const checkValidity = (username, email) => {
        return !!username && !!email;
    };
    const isValid = checkValidity(username, email);

    const makeVolunteerFormRequest = () => {
        const data = {
            username: jsonData.username,
            email: jsonData.email,
            phone: jsonData.phone,
            personable: jsonData.personable,
            organized: jsonData.organized,
            note: jsonData.note,
        }
        console.debug(data);
        volunteerRequest(data);
        setShow(false);
    };

    return (
        <Container fluid id="volunteer-page">
            <Container style={{"display": "none"}}>
                <h3>Secret volunteer button testers!</h3>
                <Button 
                    variant="info"
                    onClick={() => {
                        volunteerRequest({
                            username: "adamw",
                            email: "adam@www.com",
                            phone: "1234567890",
                            personable: true,
                            organized: true,
                            note: "Good!",
                        })}}
                    >Test good volunteer button</Button>
                    <Button 
                        variant="info"
                        className="ml-2" 
                        onClick={() => {
                            volunteerRequest({
                                username: null,
                                email: "aw@potato.com",
                                phone: "1234567890",
                                note: "bad 1!",
                            })}}
                    >Test bad volunteer button 1 (missing username)</Button>
                    <Button 
                        variant="info"
                        className="ml-2" 
                        onClick={() => {
                            volunteerRequest({
                                username: "adamw",
                                email: null,
                                phone: null,
                                note: "bad 2!",
                            })}}
                    >Test bad volunteer button 2 (no contact info)</Button>
                </Container>
            <Row>
                <Container className="banner" style={{ background: '#FAF6F6', paddingTop: '32px', paddingBottom: '32px' }}> 
                    <h3 className="font-weight-semibold">Thank you for volunteering!</h3>
                    <span className="pb-5">Fill out the form below and we will reach out to you.</span>
                 </Container>
            </Row>
            <br/>
            {/* signature: (username TEXT not null, email TEXT not null, phone TEXT, personable BOOLEAN DEFAULT FALSE, organized BOOLEAN DEFAULT FALSE, note TEXT) */}
            <Container style={{ backgroundColor: '#f9f9f9' }}>
                <Row className="justify-content-md-center" style={{ marginTop: '32px', marginBottom: '64px' }}>
                    <Col sm='10' md='9' lg='6'>
                        <p className="well" id="feedback-zone"></p>
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

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control 
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g,''))}
                                    value={phone}
                                    name="phone"
                                    type="text"
                                    maxLength="10"
                                    placeholder="Enter phone number"
                                />
                            </Form.Group>
                            
                            <ButtonGroup className="mb-2" style={{width: '100%'}}>
                                <Form.Check
                                    id="personable"
                                    key={1}
                                    type="checkbox"
                                    variant="primary"
                                    label={"Are you nice and personable with people?"}
                                    // value={false}
                                    // checked={!!radio.value}
                                    onChange={(e) => setPersonable(e.currentTarget.value === "on")}
                                />
                            </ButtonGroup>
                            <ButtonGroup className="mb-2" style={{width: '100%'}}>
                                <Form.Check
                                    id="organized"
                                    key={2}
                                    type="checkbox"
                                    variant="primary"
                                    label={"Are you good at organization, or decluttering?"}
                                    // value={false}
                                    // checked={!!radio.value}
                                    onChange={(e) => setOrganized(e.currentTarget.value === "on")}
                                />
                            </ButtonGroup>

                            <Form.Group className="mb-3" controlId="formBasicNote">
                                <Form.Label>Note</Form.Label>
                                <Form.Control name="note" type="text" as="textarea" rows="3" placeholder="Enter note" maxLength="15000"/>
                            </Form.Group>
                            <Button style={{width: '100%'}} variant="info" type="submit" disabled={!isValid} onClick={handleShow}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm volunteer form submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to submit this form?</Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Nevermind, cancel
                    </Button>
                    <Button variant="info" onClick={makeVolunteerFormRequest}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
