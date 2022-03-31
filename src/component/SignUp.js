import React, { useState } from "react";
import { Navigate } from "react-router-dom"
import firebaseConfig from "../config";
import axios from "axios";

const SignUp = () => {

    /* เพิ่มเข้าฐานข้อมูล */
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] =useState("");
    const [career,setCareer] = useState("");
    const [salary,setSaraly] = useState(0);
    
    const [currentUser, setCurrentUser] = useState(null);

    const [employeeList, setEmployeeList] = useState([]);

    

    const addEmployee = () => {
        axios.post('http://localhost:3001/create', {
            name: name,
            email:email,
            career: career,
            password: password,
            salary:salary
        }).then(() => {
            setEmployeeList([
                ...employeeList,
                {
                    name: name,
                    email:email,
                    career: career,
                    password: password,
                    salary:salary
                }
            ])
            
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
       
        try {
            firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
            setCurrentUser(true);

        } catch (error) {
            alert(error);
        }
    }

    if(currentUser){
        return <Navigate to="/dashboard" />
    }

    return (
        <>
        <div className="container mt-5">
            <h1>SignUp</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" 
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputname" className="form-label">Name</label>
                        <input type="text" name="name" className="form-control" id="exampleInputname" 
                        onChange={(event) => {
                            setName(event.target.value)
                        }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputcareer" className="form-label">Career</label>
                        <input type="text" name="career" className="form-control" id="exampleInputcareer" 
                        onChange={(event) => {
                            setCareer(event.target.value)
                        }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputsalary" className="form-label">Salary</label>
                        <input type="number" name="salary" className="form-control" id="exampleInputsalary" 
                        onChange={(event) => {
                            setSaraly(event.target.value)
                        }} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={addEmployee}>Submit</button>
            </form>
        </div>
        
        </>
    )
}

export default SignUp;