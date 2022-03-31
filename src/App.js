import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashBoard from "./component/Dashboard";
import Home from "./component/Home";
import LogIn from "./component/Login";
import SignUp from "./component/SignUp";
import FormAddOrder from "./component/FormAddOrder";
import LoginSQL from "./component/LoginSQL";
import RegisterSQL from "./component/RegisterSQL";
import { AuthProvider } from "./component/Auth";
import 'bulma/css/bulma.css';
import Axios from "axios";
        

function App() {
  return (
    
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/"  element={<Home></Home>} />
          <Route path="/addOrder" element={<FormAddOrder></FormAddOrder>} />
          <Route  path="/dashboard" element={<DashBoard></DashBoard>} />
          {/* <Route  path="/login" element={<LogIn></LogIn>} /> */}
          <Route path="/loginSQL" element={<LoginSQL></LoginSQL>}/>
          <Route  path="/signup" element={<SignUp></SignUp>} />
          <Route  path="/RegisterSQL" element={<RegisterSQL></RegisterSQL>} />
        </Routes>
      </Router>
      
    </AuthProvider>
  );
}

export default App;
