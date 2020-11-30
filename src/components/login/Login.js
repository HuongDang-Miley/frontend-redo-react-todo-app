import React, { Component } from 'react'
import '../../App.css'

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLoginButton = () => {
        if (this.state.email === '' && this.state.password === '') {
            this.setState({
                isAuth: false
            })
            return;
        }
        this.setState({
            isAuth: true
        })
    }

    render() {
        const { email, password } = this.state

        return (
            <div className="login-div">
                <form>
                    {/* <label>Email</label><br /> */}
                    <input
                        placeholder="Enter Email"
                        type='text'
                        className="login-input"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                    // onChange={(event) => handleInputChange(event)}
                    >
                    </input><br />

                    {/* <label>Password</label><br /> */}
                    <input
                        placeholder="Enter Password"
                        type='text'
                        className="login-input"
                        name="password"
                        value={password}
                        onChange={this.handleInputChange}
                    // onChange={(event) => handleInputChange(event)}
                    >
                    </input>
                    
                    <br />
                    <button
                        className="blue-button login-button"
                        onClick={this.handleLoginButton}
                    >Login</button>
                </form>
            </div>

        )
    }
}
