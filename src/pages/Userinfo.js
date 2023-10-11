import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function Userinfo() {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios
        .get("http://192.168.1.9:4000/usera")
        .then((res) => {
          if (res.data.Status === "Success") {
            setData(res.data.Result);
            console.log("Data", res.data);
          } else {
            console.log("Error detallado", res.data);
          }
        })
        .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios
          .delete("http://192.168.1.9:4000/deluser/" + id)  
          .then((res) => {
            if (res.data.Status === "Success") {
              console.log(id)
                window.location.reload(true);
            } else {
                console.log(id)
              alert("Error 2");
            }
          })
          .catch((err) => console.log(err));
      };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
    <h2>Lista de usuario</h2>
    <div className="">
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Detalle de usuarios</th>
            <th>Correo</th>
            <th>Tipo de usuario</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key="index">
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={(e) => handleDelete(item.id)}
                  size='sm'
                >
                  <i class="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="return p-3">
        <Link to="/adddept">
          <Button variant="outline-secondary"><i class="bi bi-x-circle"></i></Button>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Userinfo