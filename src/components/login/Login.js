import React from 'react'
import './login.css'

const Login = ({
    email,
    password,
    handleInputChange,
    handleLoginButton
}) => {

    return (
        <div className="login-div">
            <form>
                <label>Email</label><br />
                <input
                    type='text'
                    className="login-input"
                    name="email"
                    value={email}
                    onChange={(event) => handleInputChange(event)}
                >
                </input><br />

                <label>Password</label><br />
                <input
                    type='text'
                    className="login-input"
                    name="password"
                    value={password}
                    onChange={(event) => handleInputChange(event)}
                >
                </input><br />
                <br />
                <button
                    className="blue-button login-button"
                    onClick={() => handleLoginButton()}
                >Login</button>
            </form>
        </div>
    )

}

export default Login