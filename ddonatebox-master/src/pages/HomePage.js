import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";

import img1 from '../images/Group171.svg'
import img2 from '../images/Group95.svg'

import '../css/style.css';
import '../images/mdi/css/materialdesignicons.min.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

export default function HomePage() {
    const options = {
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };
    return (
        <Container fluid>
            <Row>
                <div className="banner" style={{ background: '#FAF6F6' }}>
                    <Container style={{ marginTop: '16px' }}>
                        <h1 className="font-weight-semibold">Donate Box!</h1>
                        <h6 className="font-weight-normal text-muted pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            <br /> Pellentesque facilisis, dui ut eleifend rhoncus, libero nibh eleifend eros.</h6>
                        <div>
                            <Link to="donate"><Button variant='info'>Donate Now</Button>{' '}</Link>
                            <Link to="volunteer"><Button variant="primary">Volunteer</Button>{' '}</Link>
                        </div>
                        <Image src={img1} className='img-fluid' style={{ marginTop: '4px' }} />
                    </Container>
                </div>
            </Row>
            <Container style={{ backgroundColor: '#f9f9f9' }}>
                <Row style={{ backgroundColor: '#f9f9f9' }}>
                    <div className="content-wrapper">
                        <Container>
                            <section className="contributions-overview" id="contributions-section" >
                                <div className="content-header">
                                    <h2>Contributions so Far</h2>
                                    <h6 className="section-subtitle text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum.<br /> Fusce egeabus consectetuer turpis, suspendisse.</h6>
                                </div>
                                <div className="d-md-flex justify-content-between">
                                    <div className="grid-margin d-flex justify-content-start">
                                        <div className="features-width">
                                            {/* <img src="images/Group12.svg" alt="" className="img-icons"/> */}
                                            <h5 className="py-3">Donations</h5>
                                            <p className="text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                            {/* <a href="#"><p className="readmore-link">Read more</p></a>   */}
                                        </div>
                                    </div>
                                    <div className="grid-margin d-flex justify-content-center">
                                        <div className="features-width">
                                            {/* <img src="images/Group7.svg" alt="" className="img-icons"/> */}
                                            <h5 className="py-3">Volunteers</h5>
                                            <p className="text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                            {/* <a href="#"><p className="readmore-link">Read more</p></a> */}
                                        </div>
                                    </div>
                                    <div className="grid-margin d-flex justify-content-end">
                                        <div className="features-width">
                                            {/* <img src="images/Group5.svg" alt="" className="img-icons"/> */}
                                            <h5 className="py-3">Something</h5>
                                            <p className="text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                            {/* <a href="#"><p className="readmore-link">Read more</p></a> */}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Container>
                    </div>
                </Row>
                <Row style={{ backgroundColor: '#f9f9f9' }}>
                    <section className="our-campaign" id="campaign-section">
                        <Row>
                            <div className="col-12 text-center pb-5">
                                <h2>Our Campaign</h2>
                                <h6 className="section-subtitle text-muted m-0">Lorem ipsum dolor sit amet, tincidunt vestibulum.</h6>
                            </div>
                            <OwlCarousel loop className="owl-carousel owl-theme grid-margin" {...options}>
                                <div className="card campaign-cards">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img src={img2} width="89" height="89" alt="" className="img-customer" />
                                            <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                            <div className="content-divider m-auto"></div>
                                            <h6 className="card-title pt-3">Card #1</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card campaign-cards">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img src={img2} width="89" height="89" alt="" className="img-customer" />
                                            <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                            <div className="content-divider m-auto"></div>
                                            <h6 className="card-title pt-3">Card #2</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card campaign-cards">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img src={img2} width="89" height="89" alt="" className="img-customer" />
                                            <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                            <div className="content-divider m-auto"></div>
                                            <h6 className="card-title pt-3">Card #3</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card campaign-cards">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img src={img2} width="89" height="89" alt="" className="img-customer" />
                                            <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                            <div className="content-divider m-auto"></div>
                                            <h6 className="card-title pt-3">Card #4</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card campaign-cards">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img src={img2} width="89" height="89" alt="" className="img-customer" />
                                            <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                            <div className="content-divider m-auto"></div>
                                            <h6 className="card-title pt-3">Card #5</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card campaign-cards">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img src={img2} width="89" height="89" alt="" className="img-customer" />
                                            <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                                            <div className="content-divider m-auto"></div>
                                            <h6 className="card-title pt-3">Card #6</h6>
                                        </div>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </Row>
                    </section>
                </Row>
                <Row style={{ backgroundColor: '#f9f9f9' }}>
                    <section className="how-steps" id="how-section">
                        <Row className="grid-margin">
                            <div className="col-12 text-center pb-5">
                                <h2>How does it work?</h2>
                                <h6 className="section-subtitle text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum.</h6>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 stretch-card mb-3 mb-lg-0" data-aos="zoom-in">
                                <div className="card color-cards">
                                    <div className="card-body p-0">
                                        <div className="bg-warning text-center card-contents">
                                            <div className="card-image">
                                                <h6 className="text-white pb-2 px-3">Sign Up</h6>
                                                <p style={{ color: '#f9f9f9' }}>
                                                    Sign up for an account
                                                </p>
                                            </div>
                                            <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                <div>
                                                    <Link to="login">
                                                        <Button variant='white'>Sign Up</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-details text-center pt-4">
                                            <h6 className="m-0 pb-1">Step 1</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 stretch-card mb-3 mb-lg-0" data-aos="zoom-in" data-aos-delay="200">
                                <div className="card color-cards">
                                    <div className="card-body p-0">
                                        <div className="bg-primary text-center card-contents">
                                            <div className="card-image">
                                                <h6 className="text-white pb-2 px-3">Donate</h6>
                                                <p style={{ color: '#f9f9f9' }}>
                                                    Donate to DonateBox
                                                </p>
                                            </div>
                                            <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                <div>
                                                    <Link to="donate">
                                                        <button className="btn btn-white">Donate</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-details text-center pt-4">
                                            <h6 className="m-0 pb-1">Step 2</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 stretch-card mb-3 mb-lg-0" data-aos="zoom-in" data-aos-delay="400">
                                <div className="card color-cards">
                                    <div className="card-body p-0">
                                        <div className="bg-violet text-center card-contents">
                                            <div className="card-image">
                                                <h6 className="text-white pb-2 px-3">Volunteer</h6>
                                                <p style={{ color: 'white' }}>
                                                    Help us out!
                                                </p>
                                            </div>
                                            <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                <div>
                                                    <Link to="volunteer">
                                                        <button className="btn btn-white">Volunteer</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-details text-center pt-4">
                                            <h6 className="m-0 pb-1">Step 3</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </section>
                </Row>
            </Container>
            
        </Container>
    );
}
