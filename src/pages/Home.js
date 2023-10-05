import axios from "axios";
import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import { Link, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function getLastDayOfMonthInFormat() {
  const currentDate = new Date();
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const year = lastDay.getFullYear();
  const month = String(lastDay.getMonth() + 1).padStart(2, "0"); // Añade ceros a la izquierda si es necesario
  const day = String(lastDay.getDate()).padStart(2, "0"); // Añade ceros a la izquierda si es necesario
  return `${year}/${month}/${day}`;
}

function Home() {
  const lastDayOfMonth = getLastDayOfMonthInFormat();

  /*const [adminCount, setAdminCount] = useState();*/
  const [employeeCount, setEmployeeCount] = useState();
  const [salary, setSalary] = useState();

  useEffect(() => {
    /* axios
      .get("http://192.168.1.9:4000/adminCount")
      .then((res) => {
        setAdminCount(res.data[0].admin);
      })
      .catch((err) => console.log(err));*/
    axios
      .get("http://192.168.1.9:4000/employeeCount")
      .then((res) => {
        setEmployeeCount(res.data[0].employee);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://192.168.1.9:4000/salary")
      .then((res) => {
        setSalary(res.data[0].sumOfSalary);
      })
      .catch((err) => console.log(err));
  });

  const [data, setData] = useState([]);
  const [dataBirth, setDataBirth] = useState([]);
  const [dataSex, setDataSex] = useState([]);
  const [dataSexm, setDataSexm] = useState([]);
  const [dataNewemp, setDataNewemp] = useState([]);
  const [dataLiq, setDataLiq] = useState([]);
  const [dataTga, setDataTga] =useState([])
  const [dataNvac, setDataNvac] = useState([]);

  const { gest } = useParams();

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rppro/202301")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
          console.log("Data", res.data);
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [gest]);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rpbirth/202301")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataBirth(res.data.Result);
          /*console.log("Data", res.data);*/
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [gest]);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rpsex")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataSex(res.data.Result);
          /*console.log("Data", res.data);*/
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rpsexm")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataSexm(res.data.Result);
          /* console.log("Data", res.data);*/
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rpnewemp")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataNewemp(res.data.Result);
          /*console.log("Data", res.data);*/
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rpliq")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataLiq(res.data.Result);
          /* console.log("Data", res.data);*/
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rptgan")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataTga(res.data.Result);
          /* console.log("Data", res.data);*/
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/nrosolp")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataNvac(res.data.Result);
          /* console.log("Data", res.data);*/
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  const [dataGraph, setDataGraph] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rpempfdep")
      .then((res) => {
        const result = res.data.Result;
        setDataGraph(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-around">
        <div className="d-flex justify-content-around">
          <div className="align-items-center bordes">
            <div className="d-flex">
              <div className="p-1  ">
                <div className="tit_hom">Total de Salarios Basicos</div>

                <div className="">
                  <span className="font1_1">{salary} Bs. </span>
                </div>
              </div>
            </div>
            <div className="tit_hom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>{" "}
              <div>
                El proximo pago:{" "}
                <span className="dateformg">{lastDayOfMonth}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justity-content-around border">
          {dataSex.map((item, index) => (
            <div>
              <span className="tit_hom p-2">Hombres</span>
              <div className="d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  fill="currentColor"
                  class="bi bi-person-standing p-2 per1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0Z" />
                </svg>
              </div>
              <div className="d-flex justify-content-center">
                <h5 className="p-1 tit_hom">{item.nro}</h5>
              </div>
            </div>
          ))}
          {dataSexm.map((item, index) => (
            <div>
              <span className="tit_hom p-2">Mujeres</span>
              <div className="d-flex justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  fill="currentColor"
                  class="bi bi-person-standing-dress p-2 per2"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
                </svg>
              </div>
              <div className="d-flex justify-content-center">
                <h5 className="p-1 tit_hom">{item.nro}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border">
        <div className="tit_hom d-flex justify-content-center">
          <h5>Total Ganado</h5>
        </div>
        <div className="d-flex justify-content-center ">
          {dataTga.map((item, index) => (
            <div key="index" className="font1_1">
              {item.LIQ} Bs.
            </div>
          ))}
        </div>
      </div>

      <div className="border">
        <div className="tit_hom d-flex justify-content-center">
          <h5>Liquido pagable</h5>
        </div>
        <div className="d-flex justify-content-center ">
          {dataLiq.map((item, index) => (
            <div key="index" className="font1_1">
              {item.LIQ} Bs.
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="d-flex justify-content-center p-3">
          <h5 className="tit_hom">Monto de aportes expresado en Bolivianos</h5>
        </div>
        {data.map((item, index) => (
          <div key="index">
            <div className="employp d-flex justify-content-center">
              <div className="d-flex">
                <div className="p-0">
                  <div className="d-flex justify-content-center">
                    <i class="bi bi-building iconsize color1"></i>
                  </div>
                  <div className="tit_hom1">Laborales</div>
                  <div className="font1_2">{item.LAB}</div>
                </div>
                <div className="border"></div>
                <div className="p-0">
                  <div className="d-flex justify-content-center">
                    <i class="bi bi-building-add iconsize color2"></i>
                  </div>
                  <div className="tit_hom1">Patronales</div>
                  <div className="font1_2">{item.PAT}</div>
                </div>
                <div className="border"></div>
                <div className="p-0">
                  <div className="d-flex justify-content-center">
                    <i class="bi bi-building-down iconsize color3"></i>
                  </div>
                  <div className="tit_hom1">Provisiones</div>
                  <div className="font1_2">{item.PRO}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border p-3">
        <div className="tit_hom d-flex justify-content-center">
          <h5>Solicitudes de Vacaciones Pendientes</h5>
        </div>
        <div className="d-flex justify-content-center">
          {dataNvac.map((item, index) => (
            <div key="index">
              <Link to="/lisvac" className="font1_10">
                {item.nsol}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="d-flex justify-content-center p-2">
          <h5 className="tit_hom">Cantidad de empleados</h5>
        </div>
        <div className="employ employp">
           <div>
            <Link className="font1_10 p-2" to={"/employee"}>
              {employeeCount}
            </Link>
          </div>
          <div></div>
        </div>
      </div>
      <div className="d-flex justify-content-center p-3">
        <h4 className="d-flex">
          <div className="p-1 tit_hom">Cumpleañeros del mes </div>
          <div>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-cake2 colr1"
              viewBox="0 0 16 16"
            >
              <path d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683c-.149.034-.293.07-.432.107-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16c2.102 0 4.022-.227 5.432-.603.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12.418 12.418 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22.03 22.03 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a28.708 28.708 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802l-.598-.79Zm-.668 5.556L3 5.524v.967c.311.074.646.141 1 .201V5.315a21.05 21.05 0 0 1 2-.242v1.855c.325.024.659.042 1 .054V5.018a27.685 27.685 0 0 1 2 0v1.964c.341-.012.675-.03 1-.054V5.073c.72.054 1.393.137 2 .242v1.377c.354-.06.689-.127 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356 0 .006-.012.139-.356.356-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5c0-.006.012-.139.356-.356.319-.2.814-.4 1.47-.575ZM15 7.806v1.027l-.68.907a.938.938 0 0 1-1.17.276 1.938 1.938 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9c2.102 0 4.022-.227 5.432-.603.612-.163 1.149-.36 1.568-.591Zm0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.938.938 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426Z" />
            </svg>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-cake2 colr2"
              viewBox="0 0 16 16"
            >
              <path d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683c-.149.034-.293.07-.432.107-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16c2.102 0 4.022-.227 5.432-.603.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12.418 12.418 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22.03 22.03 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a28.708 28.708 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802l-.598-.79Zm-.668 5.556L3 5.524v.967c.311.074.646.141 1 .201V5.315a21.05 21.05 0 0 1 2-.242v1.855c.325.024.659.042 1 .054V5.018a27.685 27.685 0 0 1 2 0v1.964c.341-.012.675-.03 1-.054V5.073c.72.054 1.393.137 2 .242v1.377c.354-.06.689-.127 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356 0 .006-.012.139-.356.356-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5c0-.006.012-.139.356-.356.319-.2.814-.4 1.47-.575ZM15 7.806v1.027l-.68.907a.938.938 0 0 1-1.17.276 1.938 1.938 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9c2.102 0 4.022-.227 5.432-.603.612-.163 1.149-.36 1.568-.591Zm0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.938.938 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426Z" />
            </svg>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-cake2 colr4"
              viewBox="0 0 16 16"
            >
              <path d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683c-.149.034-.293.07-.432.107-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16c2.102 0 4.022-.227 5.432-.603.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12.418 12.418 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22.03 22.03 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a28.708 28.708 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802l-.598-.79Zm-.668 5.556L3 5.524v.967c.311.074.646.141 1 .201V5.315a21.05 21.05 0 0 1 2-.242v1.855c.325.024.659.042 1 .054V5.018a27.685 27.685 0 0 1 2 0v1.964c.341-.012.675-.03 1-.054V5.073c.72.054 1.393.137 2 .242v1.377c.354-.06.689-.127 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356 0 .006-.012.139-.356.356-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5c0-.006.012-.139.356-.356.319-.2.814-.4 1.47-.575ZM15 7.806v1.027l-.68.907a.938.938 0 0 1-1.17.276 1.938 1.938 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9c2.102 0 4.022-.227 5.432-.603.612-.163 1.149-.36 1.568-.591Zm0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.938.938 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426Z" />
            </svg>
          </div>
        </h4>
      </div>

      <div>
        <Table responsive="sm" striped bordered hover>
          {dataBirth.map((item, index) => (
            <tbody key="index">
              <tr>
                <th className="d-flex justify-content-center">
                  {
                    <img
                      src={`http://192.168.1.9:4000/images/` + item.image}
                      alt="empleado"
                      className="employee_image"
                    />
                  }
                </th>
                <th>
                  {" "}
                  {item.firstname} {item.middlename} {item.lastname}{" "}
                  {item.lastname2}
                </th>
                <th>
                  {item.mes}/{item.dia}
                </th>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      <div className="d-flex justify-content-center">
        <h4 className="tit_hom">Ingresos del mes</h4>
      </div>
      <div>
        <Table responsive="sm" striped bordered hover>
          {dataNewemp.map((item, index) => (
            <tbody key="index">
              <tr>
                <th className="d-flex justify-content-center">
                  {
                    <img
                      src={`http://192.168.1.9:4000/images/` + item.image}
                      alt="empleado"
                      className="employee_image"
                    />
                  }
                </th>
                <th>
                  {" "}
                  {item.firstname} {item.middlename} {item.lastname}{" "}
                  {item.lastname2}
                </th>
                <th>
                  {item.anio}/{item.mes}/{item.dia}
                </th>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>

      <div className="d-flex justify-content-center">
        <h4 className="tit_hom">Empleados por Departamento</h4>
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <BarChart width={300} height={300} data={dataGraph}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="departamento" className="colorf" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="empleados" fill="#6d909d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default Home;
