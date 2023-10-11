import React, { useState } from "react";
import axios from "axios";

function AddEmp() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("http://192.168.1.9:4000/creemp", formData);
      alert("empleado agregado exitosamente");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Subir</button>
      </form>
    </div>
  );
}

export default AddEmp;
