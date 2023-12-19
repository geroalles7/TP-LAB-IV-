import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h1 className="display-1">404</h1>
          <p className="lead">¡Ups! Página no encontrada.</p>
          <p>La página que estás buscando no existe o ha sido movida.</p>
          <Link to="/">
            <Button variant="primary">Volver al inicio</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
