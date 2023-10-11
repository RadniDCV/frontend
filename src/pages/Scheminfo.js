import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'

function GestInfo() {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios
        .get("http://192.168.1.9:4000/scheinfo")
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
          .delete("http://192.168.1.9:4000/delsche/" + id)  
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
    <h2>Lista esquemas</h2>
    <div className="return p-3">
        <Link to="/adddept">
          <Button variant="outline-secondary btnw" ><i class="bi bi-x-circle"></i></Button>
        </Link>
      </div>
    <div className="col-8">
      <Table>
        <thead>
          <tr>
            <th>Esquema</th>
            <th>Cuenta 1</th>
            <th>Cuenta 2</th>
            <th>Cuenta 3</th>
            <th>Cuenta 4</th>
            <th>Cuenta 5</th>
            <th>Cuenta 6</th>
            <th>Cuenta 7</th>
            <th>Cuenta 8</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key="index">
              <td>{item.descripsche}</td>
              <td>{item.detcount1}</td>
              <td>{item.detcount2}</td>
              <td>{item.detcount3}</td>
              <td>{item.detcount4}</td>
              <td>{item.detcount5}</td>
              <td>{item.detcount6}</td>
              <td>{item.detcount7}</td>
              <td>{item.detcount8}</td>
              
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

export default GestInfo