import axios from 'axios'
import React, { Component } from 'react'
import validator from 'validator'

export default class Register extends Component {
    state = {
        email: '',
        password: '',
        emailError: true,
        emailErrorMessage: '',
        passwordError: true,
        passwordErrorMessage: '',
        successMessage: '',
    }

    handleEmailInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            if (validator.isEmail(event.target.value)) {
                this.setState({
                    emailError: false,
                    emailErrorMessage: '',
                })
            } else {
                this.setState({
                    emailError: true,
                    emailErrorMessage: 'Please enter valid Email',
                })
            }
            console.log('check state email', this.state)
        })
    }

    handlePasswordInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            let isPassword = validator.matches(
                event.target.value,
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
            if (isPassword) {
                this.setState({
                    passwordError: false,
                    passwordErrorMessage: '',
                })
            } else {
                this.setState({
                    passwordError: true,
                    passwordErrorMessage: 'Password must contain at least an uppercase, a lowercase, a symbol, and a number',
                })
            }
            console.log('check state pw', this.state)
        })

    }

    handleRegisterButton = async (event) => {
        event.preventDefault()
        let { emailError, passwordError } = this.state
        if (emailError === false && passwordError === false) {
            console.log('click on register button')
            this.props.history.push("/todo");
        }

        try {
            let newUser = await axios.post('http://localhost:3003/api/users/create-user', {
                email: this.state.email,
                password: this.state.password
            })
            console.log('newUser', newUser)
        }
        catch (e) { console.log(e.message) }

    }


    render() {
        const { email,
            password,
            emailError,
            emailErrorMessage,
            passwordError,
            passwordErrorMessage, } = this.state
        return (
            <div className="login-div">
                <form>

                    {emailError
                        ? <p className='error-message'>{emailErrorMessage}</p>
                        : ""
                    }
                    <input
                        placeholder='Email'
                        className="login-input"
                        type='text'
                        name="email"
                        value={email}
                        onChange={this.handleEmailInputChange}
                    >
                    </input><br />

                    {passwordError
                        ? <p className='error-message'>{passwordErrorMessage}</p>
                        : ""
                    }
                    <input
                        placeholder='Password'
                        type='text'
                        className="login-input"
                        name="password"
                        value={password}
                        onChange={this.handlePasswordInputChange}
                    >
                    </input><br />
                    <br />
                    <button
                        className="blue-button login-button"
                        onClick={this.handleRegisterButton}
                    >Register</button>
                </form>
            </div>
        )
    }
}
