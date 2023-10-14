import React from "react";
import Pmmin from "./reports/Pmmin";
import Pmlab from "./reports/Pmlab";
import Pmpat from "./reports/Pmpat";
import Pmpro from "./reports/Pmpro";
import Pmtri from "./reports/Pmtri";
import Repvacg from "./reports/Repvacg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Reports() {
  return (
    <div className="p-4 d-flex align-items-center justify-content-center">
      <div>
        <div className="d-flex p-2">
          <div className="px-2 col-5 tit_hom">Reporte de planilla mensual</div>
          <Pmmin />
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-5 tit_hom">Reporte Aportes Laborales</div>
          <Pmlab />
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-5 tit_hom">Reporte Aportes Patronales</div>
          <Pmpat />
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-5 tit_hom">Reporte Provisiones</div>
          <Pmpro />
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-5 tit_hom">Planilla Tributaria</div>
          <Pmtri />
        </div>
        <div className="d-flex p-2 ">
          
          <div className="px-2 col-5 tit_hom">Vacaciones Generales</div>
          <div className="col-3"></div>
          <Repvacg />
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-5 tit_hom">Historial empleados</div>
          <div className="col-3"></div>
          <Link to="/rephi">
            <Button variant="outline-success">Ver</Button>
            
          </Link>
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-5 tit_hom">Archivo para el banco</div>
          <div className="col-3"></div>
          <Link to="/repbank">
            <Button variant="outline-success">Banco</Button>
          </Link>
        </div>


      </div>
    </div>
  );
}

export default Reports;
