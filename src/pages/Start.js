import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Start() {
  const navigate = useNavigate();
  return (
    <Container >
      <Row >
        <Col>
          <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="p-3 w-25">
              <div className="d-flex justify-content-center">
              <h2>Acceso</h2>
              </div>
              <div className="d-flex justify-content-around">
              <Button
                variant="outline-success btnw"
                onClick={(e) => navigate("/employeeLogin")}
              >
                <i class="bi bi-person-circle"></i>
              </Button>
              <Button
                variant="outline-danger btnw"
                onClick={(e) => navigate("/login")}
              >
                <i class="bi bi-people"></i>
              </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Start;
