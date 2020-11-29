import React from 'react'
import './login.css'

const Login = ({
    handleInputChange,
    anotherTest,
    inputValue
}) => {

    return (

        <form className="login-form">
            <label>Email</label><br />
            <input
                type='text'
                className="login-input"
                name="inputValue"
                value={inputValue}
            onChange= {()=> handleInputChange()}
            >
            </input><br />
            <label>Password</label><br />
            <input className="login-input">
            </input><br />
            <button
                // onClick = {()=> test()}
                className="blue-button login-button">Login</button>
        </form>
    )

}

export default Login