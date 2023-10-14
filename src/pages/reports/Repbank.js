import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Repbank = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://192.168.1.9:4000/reporbank/${id}`
      );
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Error al obtener datos");
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (data.length === 0) {
      setError("No hay datos para exportar.");
      return;
    }

    const dataArray = Array.isArray(data) ? data : [data];

    const ws = XLSX.utils.json_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, "datos.xlsx");
  };

  return (
    <div>
      <div className="p-3 repexls">
        <input
          type="text"
          placeholder="Ingrese gestion"
          value={id}
          onChange={(e) => setId(e.target.value)} // Actualizar el estado del ID al cambiar el valor del campo de entrada
        />
        <Button
          variant="outline-success"
          onClick={handleExportExcel}
          disabled={data.length === 0 || loading}
        >
          <i class="bi bi-filetype-xlsx"></i> Exportar a Excel
        </Button>
        <Button variant="outline-info" onClick={fetchData} disabled={loading}>
          <i class="bi bi-search"></i> Obtener Datos
        </Button>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="d-flex justify-content-center">
        <Link to="/report">
          <Button variant="outline-secondary">
          <i class="bi bi-x-circle"></i> Retornar
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Repbank;
