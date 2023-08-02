import { Container, Row } from "react-bootstrap";

export default function NoPage() {
    return ( 
        <Container className="mt-2 mb-5" id="no-page">
            <Row className="mt-5">  
                <Container className="banner mt-5 mb-5" style={{ background: '#FAF6F6', paddingTop: '32px', paddingBottom: '32px' }}> 
                    <h3 className="font-weight-semibold mb-5">404</h3>
                    <p className="text-center">You have come to an incorrect page. Use the navigation bar or press back in your browser to get to a functioning page.</p>
                </Container> 
            </Row>
        </Container> 
    );
}
