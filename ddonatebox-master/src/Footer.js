import { Button, ButtonGroup, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Row style={{backgroundColor: "#f9f9f9"}}>
        <section className="contact-details" id="contact-details-section">
            <Row className="text-center text-md-left">
                <div className="col-12 col-md-6 col-lg-3 grid-margin">
                    <div className="pt-2">
                        <p className="text-muted m-0">donatebox@gmail.com</p>
                        <p className="text-muted m-0">999-1111-8888</p>
                    <ButtonGroup className="mt-2">
                        <Button variant="link" size="xs"><span className="mdi mdi-facebook"></span></Button>
                        <Button variant="link" size="xs"><span className="mdi mdi-twitter"></span></Button>
                        <Button variant="link" size="xs"><span className="mdi mdi-instagram"></span></Button>
                    </ButtonGroup>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 grid-margin">
                    <h5 className="pb-2">Get in Touch</h5>
                    <p className="text-muted">Subscribe to our email list</p>
                    <form>
                        <input type="text" className="form-control" id="Email" placeholder="Email address" />
                    </form>
                    <div className="pt-3">
                        <Button className="btn btn-dark">Subscribe</Button>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 grid-margin">
                    <h5 className="pb-2">Our Guidelines</h5>
                    <ButtonGroup vertical>
                        <Button variant="link" size="xs"><Link to="aboutus">Terms</Link></Button>
                        <Button variant="link" size="xs"><Link to="aboutus">Privacy policy</Link></Button>
                        <Button variant="link" size="xs"><Link to="aboutus">Cookie Policy</Link></Button>
                        <Button variant="link" size="xs"><Link to="aboutus">Discover</Link></Button>
                    </ButtonGroup>
                </div>
                <div className="col-12 col-md-6 col-lg-3 grid-margin">
                    <h5 className="pb-2">Our Address</h5>
                    <p className="text-muted">3675 Market St<br />Philadelphia, PA</p>
                </div>
            </Row>
        </section>
    </Row>
  );
}
