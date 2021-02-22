import React, { Component } from 'react'
import Todo from '../todo/Todo'
import validator from 'validator'
import axios from 'axios'
import '../../App.css'
import Message from "../shared/Message"
import jwtDecode from 'jwt-decode'
import { getLocalStorageToken } from '../utils/helpers'

export class Login extends Component {
    state = {
        isAuth: false,
        email: '',
        password: '',
        // isError: false,
        // isPasswordError: false,
        isPasswordErrorMessage: '',
        isSubmitError: false,
        submitErrorMessage: '',
        isSuccessMessage: false,
        successMessage: 'success.data.message',
        notAuthenticMessage: ""
    }

    // componentDidMount() {
    //     let token = localStorage.getItem("jwtToken")
    //     // if (token === null) {
    //     //     this.props.history.push('/home')
    //     // } else {
    //         if (token) {
    //         let decoded = jwtDecode(token)
    //         console.log(token)
    //         console.log(decoded)
    //         this.setState({
    //             user: {
    //                 email: decoded.email,
    //                 _id: decoded._id
    //             }
    //         }, () => {
    //             // this.props.auth(success.data.jwtToken)
    //             console.log('test npm run start')
    //             this.props.history.push('/todo')
    //         }) 
    //     }
    // }

    componentDidMount() {
        let token = getLocalStorageToken()

        if (token) {
            let decoded = jwtDecode(token)
            let currentTime = Date.now() / 1000

            if (decoded.exp < currentTime) {
                localStorage.removeItem("jwtToken")

            } else {
                this.setState({
                    isAuth: true,
                    user: {
                        email: decoded.email,
                        _id: decoded._id
                    }
                })
            }
        }
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }
            // , () => {
            //     // // check if the input is an email

            //     const { email } = this.state;
            //     let isEmail = validator.isEmail(email)
            //     // let isEmail = email.includes('@')
            //     if (isEmail) {
            //         this.setState({
            //             isError: false,
            //             errorMessage: ''
            //         })
            //     } else {
            //         this.setState({
            //             isError: true,
            //             errorMessage: 'Please enter a correct email'
            //         })
            //     }
            // }
        )
    }

    handleOnChangePassword = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }
            // , () => {
            //     const { password } = this.state
            //     let isPassword = validator.matches(
            //         password,
            //         "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
            //     if (isPassword) {
            //         this.setState({
            //             isPasswordError: false,
            //             isPasswordErrorMessage: ''
            //         })
            //     } else {
            //         this.setState({
            //             isPasswordError: true,
            //             isPasswordErrorMessage: 'password must contain a lowercase, an uppercase, and a symbol',
            //         })
            //     }
            // }
        )
    }

    handleOneSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = this.state

        if (validator.isEmpty(email) && validator.isEmpty(password)) {
            this.setState({
                // isSubmitError: true,
                // submitErrorMessage: 'cannot have empty email or password'
                isError: true,
                errorMessage: 'cannot have empty email or password'
            })
            return;
        } else {
            this.setState({
                isError: false,
                errorMessage: ''
            })
        };

        if (validator.isEmpty(email)) {
            console.log('email is empty')
            this.setState({
                // isSubmitError: true,
                // submitErrorMessage: 'cannot have empty email'
                isError: true,
                errorMessage: 'cannot have empty email'
            })
            return;
        } else {
            this.setState({
                // isSubmitError: false,
                // submitErrorMessage: ''
                isError: false,
                errorMessage: ''
            })

        }

        if (validator.isEmpty(password)) {
            console.log('pw is empty')
            this.setState({
                // isSubmitError: true,
                // submitErrorMessage: 'cannot have empty password'
                isError: true,
                errorMessage: 'cannot have empty password'
            })
        } else {
            this.setState({
                // isSubmitError: false,
                // submitErrorMessage: ''
                isError: false,
                errorMessage: ''
            })
        }

        try {
            // if use in server
            let success = await axios.post('/api/users/login', {
                // If use locally
            // let success = await axios.post('http://localhost:3003/api/users/login', {
                email: email,
                password: password
            })

            localStorage.setItem('jwtToken', success.data.jwtToken,)

            // once login successfully, set State Auth to true
            this.setState({
                isAuth: true,
            }, () => {
                this.props.auth(success.data.jwtToken)
                console.log('check props', this.props.auth)
                this.props.history.push("/todo")
                console.log('check state', this.state)
            })
            
            console.log('check state once login success', this.state)
        }
        catch (e) {
            console.log(e)

            let errorMessage = e.toString()
            if (errorMessage === "Error: Network Error") {
                this.setState({
                    isAuth: false,
                    isError: true,
                    errorMessage: "something wrong with server, contact us"
                })
                return;
            }

            // if (e.response.status === 401) {
            //     this.setState({
            //         isAuth: false,
            //         isError: true,
            //         errorMessage: e.response.data.message
            //     })
            //     return;
            // }
            else if (e.response.status === 404) {
                this.setState({
                    isAuth: false,
                    isError: true,
                    errorMessage: e.response.data.message
                })
                return;
            }
            else if (e.response.status === 500) {
                this.setState({
                    isAuth: false,
                    isError: true,
                    errorMessage: e.response.data.message
                })
                return;
            }


            console.log('line173', this.state.isAuth)
        }

    }


    render() {
        const {
            email,
            password,
            isAuth,
            isError,
            errorMessage,
            isSubmitError,
            notAuthenticMessage,
        } = this.state


        return (
            <div style={{ textAlign: "center", marginTop: 20 }}>
                {/* {showTodoComponent} */}
                <form onSubmit={this.handleOneSubmit}>
                    {" "}
                    {isAuth
                        ? (<Message className={'error-message'} message={notAuthenticMessage} />)
                        : ("")
                    }

                    {isError
                        ? (<Message className={'error-message'} message={errorMessage} />)
                        : ("")
                    }
                    <input
                        className="login-input"
                        type="text"
                        name="email"
                        placeholder="enter email"
                        onChange={this.handleOnChange}
                        value={email}
                    /><br />{" "}

                    <input
                        className="login-input"
                        type="text"
                        name="password"
                        placeholder="enter password"
                        onChange={this.handleOnChange}
                        value={password}
                    /><br />{" "}
                    <button
                        className="blue-button login-button"
                    >Login</button>

                </form>

            </div>
        )
    }
}

export default Login

