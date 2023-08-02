import { Container, Row } from "react-bootstrap";

export default function AboutUsPage() {
    return (
        <Container className="mt-2 mb-2" id="about-us-page">
            <Row className="mt-3">  
                <Container className="banner mt-5 mb-3" style={{ background: '#FAF6F6', paddingTop: '32px', paddingBottom: '32px' }}> 
                    <h3 className="font-weight-semibold mb-5">Who are we?</h3>
                    
                    <p className="text-center">Our organization helps communities to get along in our striving mission process to donate in items such as clothing, food and other articles for everyday use. Donation is also a great way to self-actualization that helps to generate a message of goodwill. So with this mission statement, we are moving forward making communities to join us in our great mission campaign.</p>
                </Container> 
            </Row>
            <br/>
            <Row className="mt-3 mb-4 d-flex justify-content-center align-item-center">
                <div className="col-12 col-lg-3 p-3 m-3" style={{background:'#FBF1FD'}}>
                    <h4 style={{textTransform: 'uppercase'}}>Our Mission</h4>
                    <p>We at DonateBox have one and only one objective: to help communities join us in our great mission to donate as much as possible. We want to spread a message of a sustainable life for today and for future generations!</p>
                </div>
                <div className="col-12 col-lg-3 p-3 m-3" style={{background:'#EDFFF6'}}>
                    <h4 style={{textTransform: 'uppercase'}}>Events</h4>
                    <p>We have events and activities all throughout the year for communities to join our mission to donate. These events are held at different locations, making the donation process as simple and transparent as possible, so that more people are willing to come forward and get involved.</p>
                </div>
                <div className="col-12 col-lg-3 p-3 m-3" style={{background:'#FFF8DF'}}>
                    <h4 style={{textTransform: 'uppercase'}}>Campaigns</h4>
                    <p>We at Donate Box are striving our best to create awareness campaigns that help communities and people to come across with one mission: living a healthy, sustainable life. We want this for all people to make our planet earth a healthy and happy place to live in!</p>
                </div>
            </Row>
        </Container>
    );
}
