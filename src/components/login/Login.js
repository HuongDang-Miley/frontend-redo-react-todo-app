import React, { Component } from 'react'
import './login.css'

const Login = () => {
    
        return (
            <form className="login-form">
                <label style={{textAlign: "left"}}>Email</label><br/>
                <input className = "login-input"></input><br/>
                <label>Password</label><br/>
                <input className = "login-input"></input><br/>
                <button className = "edit login-button">Login</button>
            </form>
        )
    
}

export default Login