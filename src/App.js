import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Profile from "./pages/Profile";
import AddEmployee from "./pages/AddEmployee";
import EmployeeEdit from "./pages/EmployeeEdit";
import AddDepart from "./pages/AddDepart";
import Dept from "./pages/Dept";
import Branch from "./pages/Branch";
import Deptinfo from "./pages/Deptinfo";
import Branchinfo from "./pages/Branchinfo";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import Gest from "./pages/Gest";
import Gestinfo from "./pages/Gestinfo";
import Ufv from "./pages/Ufv";
import Start from "./pages/Start";
import EmployeeDetail from "./pages/EmployeeDetail";
import UserA from "./pages/UserA";
import Userinfo from "./pages/Userinfo";
import PayrollAdd from "./pages/PayrollAdd";
import PageNofound from "./pages/PageNofound";
import PayDetail from "./pages/PayDetail";
import PayDetailLi from "./pages/PayDetailLi";
import Payrollemp from "./pages/Payrollemp";
import Payrollemli from "./pages/Payrollemli";
import EmployeLogin from "./pages/EmployeLogin";
import AddEmp from "./pages/AddEmp";
import UfvInfo from "./pages/Ufvinfo";
import Plamen from "./pages/Plamen";
import Vacation from "./pages/Vacation";
import Vacsol from "./pages/Vacsol";
import Lisvac from "./pages/Lisvac";
import Pmschem from "./pages/reports/Pmschem";
import Schem from "./pages/Schem";
import Scheminfo from "./pages/Scheminfo";
import Rephist from "./pages/reports/Rephist"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create" element={<AddEmployee />}></Route>
          <Route path="/adddept" element={<AddDepart />}></Route>
          <Route path="/dept" element={<Dept />}></Route>
          <Route path="/branch" element={<Branch />}></Route>
          <Route path="/deptinfo" element={<Deptinfo />}></Route>
          <Route path="/branchinfo" element={<Branchinfo />}></Route>
          <Route path="/payroll" element={<Payroll />}></Route>
          <Route path="/payrolladd" element={<PayrollAdd />}></Route>
          <Route path="/paydetail" element={<PayDetail />}></Route>
          <Route path="/paydetailli/:gest" element={<PayDetailLi />}></Route>
          <Route path="/payrollemp" element={<Payrollemp />}></Route>
          <Route path="/payrollemli" element={<Payrollemli />}></Route>
          <Route path="/report" element={<Reports />}></Route>
          <Route path="/creagest" element={<Gest />}></Route>
          <Route path="/gestinfo" element={<Gestinfo />}></Route>
          <Route path="/creaufv" element={<Ufv />}></Route>
          <Route path="/ufvinfo" element={<UfvInfo />}></Route>
          <Route path="/usera" element={<UserA />}></Route>
          <Route path="/userinfo" element={<Userinfo />}></Route>
          <Route path="/plamen/:gest" element={<Plamen />}></Route>
          <Route path="/vaca" element={<Vacation />}></Route>
          <Route path="employeeedit/:id" element={<EmployeeEdit />}></Route>
          <Route path="/addemplo" element={<AddEmp />}></Route>
          <Route path="/lisvac" element={<Lisvac />}></Route>
          <Route path="/repschema" element={<Pmschem/>}></Route>
          <Route path="/schem" element={<Schem/>}></Route>
          <Route path="/chemlist" element={<Scheminfo/>}></Route>
          <Route path="*" element={<PageNofound />}></Route>
          <Route path="/rephi" element={<Rephist/>}></Route>
          
          
         
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/start" element={<Start />}></Route>
        <Route>
          <Route path="/employeelogin" element={<EmployeLogin />}></Route>
          <Route path="/employeedetail/:id" element={<EmployeeDetail />}></Route>
          <Route path="/vacsol/:id" element={<Vacsol />}></Route>
          <Route path="*" element={<PageNofound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
