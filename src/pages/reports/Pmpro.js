import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";

function App() {
  const [dataGes, setDataGes] = useState([]);
  const [data, setData] = useState({
    gest: "",
  });

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/detgest")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataGes(res.data.Result);
          console.log(dataGes);
        } else {
          console.log("Error", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const generarPDF = async (gestion) => {
    try {
      const response = await fetch(
        `http://192.168.1.9:4000/repprov/${gestion}`
      );
      const blob = await response.blob();

      // Crear un enlace para descargar el PDF
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `PlanillaPro${gestion}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <div className="d-flex">
      <div>
        <Form.Select
          onChange={(e) => setData({ ...data, gest: e.target.value })}
          id="inputGestion"
          value={data.gest}
        >
          <option>Gestion</option>
          {dataGes.map((gestion) => (
            <option key={gestion.gest} value={gestion.gest}>
              {gestion.gest}
            </option>
          ))}
        </Form.Select>
      </div>

      <div className="px-2">
        <Button
          className="px-3"
          variant="outline-success"
          onClick={() => generarPDF(data.gest)}
        >
          <i class="bi bi-file-earmark-pdf"></i> PDF
        </Button>
      </div>
    </div>
  );
}

export default App;
