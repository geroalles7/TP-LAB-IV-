import { Container, Row, Col, Button } from "react-bootstrap";

export default function Home() {
  const jumbotronStyle = {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://source.unsplash.com/1920x1080/?laptop')",
    backgroundSize: "cover",
    color: "white",
    minHeight: "100vh", // Altura mínima de la ventana visible
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={jumbotronStyle}>
      <Container className="py-5 text-center">
        <Row>
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
    </div>
  );
}
