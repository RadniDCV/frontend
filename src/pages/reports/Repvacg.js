import React from "react";
import Button from "react-bootstrap/Button";




function Repvacg() {
  

  const generarPDF = async (gestion) => {
    try {
      const response = await fetch(`http://192.168.1.9:4000/detvact`);
      const blob = await response.blob();

      // Crear un enlace para descargar el PDF
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `VacacionesGen.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <div className="d-flex">
      
      
       <div className="px-2">
        <Button className="px-3" variant="outline-success" onClick={generarPDF}>
        <i class="bi bi-file-earmark-pdf"></i> PDF
        </Button>
      </div>
    </div>
  );
}

export default Repvacg;
