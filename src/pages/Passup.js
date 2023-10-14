import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams desde 'react-router-dom'
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Passup() {
  const { id } = useParams(); // Invoca useParams como función para obtener los parámetros

  const [data, setData] = useState({
    empid: id,
  });

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, confirmNewPassword } = formData;
    if (newPassword !== confirmNewPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Realizar la solicitud para cambiar la contraseña
      await axios.put(`http://192.168.1.9:4000/updatepass/${id}`, {
        password: newPassword,
      });

      // Limpiar mensajes de error y mostrar mensaje de éxito
      setError(null);
      setSuccessMessage("Contraseña actualizada con éxito");
      console.log(id);

      // También podrías redirigir al usuario a otra página aquí (por ejemplo, página de inicio de sesión).
    } catch (error) {
      // Manejar errores de la solicitud
      setError(
        "Error al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde."
      );
      console.error("Error al cambiar la contraseña", error);
    }
  };

  return (
    <div className="formpass">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="formcod">
          <label>Codigo empleado</label>
          <input
            type="text"
            className="form-control"
            id="inputEmpid"
            placeholder="Introduce Codigo"
            autoComplete="off"
            value={data.empid}
            onChange={(e) => setData({ ...data, empid: e.target.value })}
            readOnly
            required
          />
        </div>
        <div>
          <label className="col-5">Nueva Contraseña:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="col-5">Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="d-flex justify-content-center p-3">
          <Button type="submit" variant="outline-success">
            Cambiar Contraseña
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/start">
            <Button variant="outline-secondary">
              <i class="bi bi-x-circle"></i>
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Passup;
