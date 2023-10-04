import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function UfvInfo() {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios
        .get("http://192.168.1.9:4000/ufvinfo")
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
          .delete("http://192.168.1.9:4000/delufv/" + id)  
          .then((res) => {
            if (res.data.Status === "Success" || res.data.Status === "Exito") {
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
    <h2>Lista de UFV</h2>
    <div className="return p-3">
        <Link to="/adddept">
          <Button variant="outline-secondary btnw" ><i class="bi bi-x-circle"></i></Button>
        </Link>
      </div>
    <div className="">
      <Table>
        <thead>
          <tr>
            <th>UFV Mayor</th>
            <th>UFV Menor</th>
            <th>Gestion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key="index">
              <td>{item.montmay}</td>
              <td>{item.montmen}</td>
              <td>{item.gest}</td>
              <td className='d-flex justify-content-center'>
                <Button
                  variant="outline-danger btnw"
                  onClick={(e) => handleDelete(item.id)}
                  size="sm"
                >
                  <i class="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
  </div>
  )
}

export default UfvInfo