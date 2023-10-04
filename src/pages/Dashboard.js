import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from 'axios'

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  useEffect(()=>{
    axios.get('http://192.168.1.9:4000/dashboard').then((res)=>{
      if(res.data.Status === "Success"){
        if(res.data.role === "01"){
          navigate("/")
        }else{
          const id = res.data.id
          navigate("/employeedetail/" + id)
        }
      }else{
        navigate("/start")
      }
    })
  },[])

  const handleLogout =() => {
    axios
    .get("http://192.168.1.9:4000/logout")
    .then((res) =>{
      navigate("/start")
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Panel de Administración
              </span>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link
                  to="/"
                  data-bs-toggle="collapse"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Panel</span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">
                    Administracion de Empleados
                  </span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Perfil</span>
                </Link>
              </li>
              <li>
                  <Link to="payroll"
                  className="nav-link px-0 align-middle text-white"
                  >
                  <i className="fs-4  bi bi-file-spreadsheet"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Planillas</span>
                  </Link>
              </li>

              <li>
                  <Link to="report"
                  className="nav-link px-0 align-middle text-white"
                  >
                  <i className="fs-4  bi bi-file-earmark-pdf"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Reportes</span>
                  </Link>
              </li>

              <li>
                <Link
                  to="lisvac"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="fs-4 bi bi-calendar3"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Vacaciones</span>
                </Link>
              </li>

              <li>
                <Link
                  to="adddept"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-gear"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Configuracion</span>
                </Link>
              </li>

               <li onClick={handleLogout}>
                
                  <i className="fs-4 bi-power"></i>{" "}
                  <span className="ms-1 d-none - d-sm-inline">
                    Cerrar Sesion
                  </span>
                
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Sistema de pago de planillas</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
