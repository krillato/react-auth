import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { Nevigate } from "./navigate";
import { AuthContext } from "./Auth";

const Home =()=> {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);
    return(
        <>
        <Nevigate></Nevigate>
            <div className="container mt-5">
                <h1>Home</h1>
                {currentUser ? (
                    <p>You are log in - <Link to="/dashboard">View Dashboard</Link></p>
                ) : (
                    <p>
                        <Link to="/login" className="btn btn-primary">Log In</Link> or <Link to ="/signup" className="btn btn-success">Sign Up</Link>
                    </p>
                )}
            </div>
        </>
    )
}

export default Home;