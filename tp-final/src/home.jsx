import { Container, Row, Col, Button } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="py-5">
      <Row className="text-center">
        <Col>
          <h1 className="display-3">Bienvenido a CyberWorld</h1>
          <p className="lead">
            Tu destino para las mejores laptops del futuro.
          </p>
          <Button variant="primary" size="lg" href="/laptops">
            Explorar Laptops
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
