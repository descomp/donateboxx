import { Button, ButtonGroup, Col, Container, Form, Image, InputGroup, Modal, Row, ToggleButton } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

import img1 from '../images/donate.png'
import '../css/DonatePage.css'
import '../css/style.css';
import '../images/mdi/css/materialdesignicons.min.css'
import { useState } from "react";

export default function DonatePage() {
    const { loginData, donateRequest } = useOutletContext();

    const [name, setName] = useState(loginData?.username ?? "");
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState(loginData?.email ?? "");
    const [phone, setPhone] = useState((loginData?.phone ?? "").replace(/\D/g,''));
    const [radioValue, setRadioValue] = useState('10');
    const [show, setShow] = useState(false);
    const [jsonData, setJsonData] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const radios = [
        { name: '10$', value: '10' },
        { name: '20$', value: '20' },
        { name: '30$', value: '30' },
        { name: 'Other', value: 'Other' },
    ];

    const onFormSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (radioValue !== 'Other') {
            setAmount(parseInt(radioValue));
        }
        formData.append('amount', amount);
        const formDataObj = Object.fromEntries(formData.entries());
        setJsonData(formDataObj);
        console.log(formDataObj);
    }

    const checkValidity = (name, email) => {
        return !!name && !!email;
    };
    const isValid = checkValidity(name, email);

    const otherValidity = (radioValue) => (radioValue === 'Other');
    
    const isOtherValid = otherValidity(radioValue);

    const makePayment = () => {
        const data = {
            amount: parseInt(amount),
            name: jsonData.name,
            email: jsonData.email,
            phone: jsonData.phone,
            note: jsonData.note,
        }
        console.log(data);
        donateRequest(data);
        setShow(false);
    };

    return (
        <Container fluid id="donate-page">
            <Container style={{"display": "none"}}>
                <h3>Secret donate request testers!</h3>
                <Button 
                    variant="info"
                    onClick={() => {
                        donateRequest({
                            amount: 12345,
                            name: "adamw",
                            email: "adam@www.com",
                            phone: "1234567890",
                            note: "good!",
                        })
                    }}>Test good donate button</Button>
                    <Button 
                    className="ml-2" 
                    variant="info"
                    onClick={() => {
                        donateRequest({
                            amount: undefined,
                            name: "adamw",
                            email: "aw@potato.com",
                            phone: "1234567890",
                            note: "bad 1!",
                        })}}
                    >Test bad donate request button 1 (invalid amount)</Button>
                    <Button 
                    className="ml-2"
                    variant="info"
                    onClick={() => {
                        donateRequest({
                            amount: undefined,
                            name: "adamw",
                            email: null,
                            phone: null,
                            note: "Bad 2!",
                        })}}
                    >Test bad donate request button 2 (lacking contact info)</Button>
            </Container>
            <Row>
                <div className="banner" style={{ background: '#FAF6F6' }}>
                    <div style={{ marginTop: '32px' }} className="container">
                        <h3 className="font-weight-semibold">Make a Donation Today!</h3>
                        <Image src={img1} className='img-fluid' style={{ marginTop: '4px', marginBottom: '4px' }} />
                    </div>
                </div>
            </Row>
            <br/>
            {/* signature: (amount REAL not null, name TEXT not null, email TEXT, phone TEXT, note TEXT) */}
            <Container style={{ backgroundColor: '#f9f9f9' }}>
                <Row className="justify-content-md-center" style={{ marginTop: '32px', marginBottom: '64px' }}>
                    <Col sm='10' md='9' lg='6'>
                        <p className="well" id="feedback-zone"></p>
                        <Form onSubmit={onFormSubmit}>
                            <ButtonGroup className="mb-2" style={{width: '100%'}}>
                                {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        variant="primary"
                                        value={radio.value}
                                        checked={radioValue === radio.value}
                                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                            <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                                <Form.Control
                                    style={{height: 'auto', marginLeft: '0px'}}
                                    onChange={(e) => {
                                        setAmount(parseInt(e.target.value));
                                    }}
                                    name="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    disabled={!isOtherValid}
                                />
                            </InputGroup>

                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }} value={name}
                                    name="name"
                                    type="name"
                                    placeholder="Enter name"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} value={email}
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

                            <Form.Group className="mb-3" controlId="formBasicNote">
                                <Form.Label>Note</Form.Label>
                                <Form.Control name="note" type="text" as="textarea" rows="3" placeholder="Enter note" maxLength="15000"/>
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                            <Button style={{width: '100%'}} variant="info" type="submit" disabled={!isValid} onClick={handleShow}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row> 
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Finalize payment?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to finalize payment?</Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="info" onClick={makePayment}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
