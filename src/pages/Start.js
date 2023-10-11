import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";


function Start() {
  const navigate = useNavigate();
  return (
    
          <div className="section1">
            <div>
              <div >
                <div className="d-flex justify-content-center">
                  <h2>Sistema de pago de planillas</h2>
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
          </div>
    
  );
}

export default Start;
