import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import firebaseConfig from "../config";
import { AuthContext } from "./Auth";
import axios from "axios";

const DashBoard = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [newsalary, setNewSalary] = useState(0);


  // ตรวจสอบ Token เมื่อมีการเข้าสู่ระบบในหน้านี้
  useEffect(() => {
    const token = localStorage.getItem("token"); // เก็บ token จาก local
    fetch("http://localhost:3001/authen", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          //alert('authen sucess');
        } else { //ไม่มีการเข้าสู่ระบบให้ logout ออก
          alert("authen Failed"); 
          localStorage.removeItem("token");
          window.location = "/loginSQL";
        }
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //logout ของ SQL remove Token
  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/loginSQL";
  }

  const getEmployee = () => {
    axios.get("http://localhost:3001/employee").then((response) => {
      setEmployeeList(response.data);
    });
  };
  const { currentUser } = useContext(AuthContext);

  const updateEmployeeSalary = (id) => {
    axios
      .put("http://localhost:3001/update", { salary: newsalary, id: id })
      .then((response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.employee_id == id
              ? {
                  id: val.employee_id,
                  name: val.name,
                  email: val.email,
                  career: val.career,
                  salary: newsalary,
                }
              : val;
          })
        );
      });
  };

  const DeleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          {
            return val.employee_id != id;
          }
        })
      );
    });
  };

  /* if (!currentUser) {
    return <Navigate to="/login" />;
  } */

  return (
    <div>
      <div className="Container mt-5">
        <h1>Welcome</h1>
        <p>นี้เป็นหน้าแรกของการเข้าสู่ระบบ</p>
        <button
          onClick={() => firebaseConfig.auth().signOut()}
          className="btn btn-danger"
        >
          Sign Out(firebase)
        </button>
        <button className="btn btn-warning" onClick={handleLogout}>
          Logout for token(SQL)
        </button>
        <button className="btn btn-primary" onClick={getEmployee}>
          Show employee
        </button>
      </div>
      <br></br>
      <div className="Container mt-5">
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">E-mail: {val.email}</p>
                <p className="card-text">Career: {val.career}</p>
                <p className="card-text">Salary: {val.salary}</p>
                <br></br>
                <div className="d-flex">
                  <input
                    type="number"
                    style={{ width: "300px" }}
                    placeholder="ใส่เงินเดือนที่ต้องการแก้ไข"
                    className="form-control"
                    onChange={(event) => {
                      setNewSalary(event.target.value);
                      // console.log("เงินเดือนใหม่"+setNewSalary);
                    }}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      updateEmployeeSalary(val.employee_id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      DeleteEmployee(val.employee_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashBoard;
