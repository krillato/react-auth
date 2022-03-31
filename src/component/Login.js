import React, { useContext } from "react";
import { Navigate } from "react-router-dom"
import firebaseConfig from "../config";
import { AuthContext } from "./Auth";

// Login แบบ firebase
const LogIn = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        try {
            firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
            //setCurrentUser(true);
        } catch (error) {
            alert(error)
        }
    }
    const {currentUser} = useContext(AuthContext);
    if(currentUser){
        return <Navigate to="/dashboard" />
    }


    return (
        <>
        
          <div className="container mt-5">
              <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
          </div>
        </>
    )
}

export default LogIn;






