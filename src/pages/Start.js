import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Start() {
  const navigate = useNavigate();
  return (
    <div className="section1">
      <div>
        <div>
          <div className="d-flex justify-content-center">
            <h2 className="tit_gm tracking-in-contract-bck focus-in-expand-fwd">Sistema de pago de planillas</h2>
          </div>
          <div className="d-flex justify-content-around">
            <div className="startBtn">
              <div className="p-2">Usuario</div>
              <div>
                <Button
                  variant="outline-info btnw"
                  onClick={(e) => navigate("/employeeLogin")}
                >
                  <i class="bi bi-person-circle"></i>
                </Button>
              </div>
            </div>
            <div className="startBtn">
              <div className="p-2">Empresa</div>
              <div>
                <Button
                  variant="outline-light btnw"
                  onClick={(e) => navigate("/login")}
                >
                  <i class="bi bi-people"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
