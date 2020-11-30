import React from 'react'

const Register = ({
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
                    // type='text'
                    // className="login-input"
                    // name="email"
                    // value={email}
                    // onChange={(event) => handleInputChange(event)}
                >
                </input><br />

                <label>Password</label><br />
                <input
                    // type='text'
                    // className="login-input"
                    // name="password"
                    // value={password}
                    // onChange={(event) => handleInputChange(event)}
                >
                </input><br />
                <br />
                <button
                    className="blue-button login-button"
                    onClick={() => handleLoginButton()}
                >Register</button>
            </form>
        </div>
    )

}

export default Register