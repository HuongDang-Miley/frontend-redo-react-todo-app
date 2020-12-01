import axios from 'axios'
import React, { Component } from 'react'
import validator from 'validator'
// import localStorage from 'jwtToken'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default class Register extends Component {
    state = {
        isAuth: false,
        email: '',
        password: '',
        emailError: true,
        emailErrorMessage: '',
        passwordError: true,
        passwordErrorMessage: '',
        successMessage: '',
    }

    componentDidMount() {
        // let jwtToken = localStorage.getItem('jwtToken')
        // console.log('jwtToken', jwtToken)
        // let decoded = jwtDecode(jwtToken)
        // console.log('decoded', decoded)
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
            console.log('props', this.props)
            // this.props.history.push("/todo");
        }

        try {
            let newUser = await axios.post('http://localhost:3003/api/users/create-user', {
                email: this.state.email,
                password: this.state.password
            })

            localStorage.setItem('jwtToken', newUser.data.jwtToken)
            console.log('newUser', newUser)
            console.log('newUser jwtToken', newUser.data.jwtToken)

            this.setState({
                isAuth: true
            }, () => {
                this.props.auth(newUser.data.jwtToken)
                this.props.history.push("/todo")
                console.log('check props in register', this.props)
            })

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
