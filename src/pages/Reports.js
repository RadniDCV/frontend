import React from "react";
import Pmmin from "./reports/Pmmin";
import Pmlab from "./reports/Pmlab";
import Pmpat from "./reports/Pmpat";
import Pmpro from "./reports/Pmpro";
import Pmtri from "./reports/Pmtri";

function Reports() {
  return (
    <div className="p-3 d-flex align-items-center">
      <div>
        <div className="d-flex p-2">
          <div className="px-2 col-4">Reporte de planilla mensual</div>
          <Pmmin />
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-4">Reporte Aportes Laborales</div>
          <Pmlab />
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-4">Reporte Aportes Patronales</div>
          <Pmpat />
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-4">Reporte Provisiones</div>
          <Pmpro />
        </div>
        <div className="d-flex p-2">
          <div className="px-2 col-4">Planilla Tributaria</div>
          <Pmtri />
        </div>
      </div>
    </div>
  );
}

export default Reports;
