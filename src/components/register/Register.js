import React, { Component } from 'react'
import Todo from '../todo/Todo'
import validator from 'validator'
import axios from 'axios'
import Message from "../shared/Message"


export class Register extends Component {
    state = {
        isAuth: false,
        email: '',
        password: '',
        errorMessage: '',
        isError: false,
        isPasswordError: false,
        isPasswordErrorMessage: '',
        isSubmitError: false,
        submitErrorMessage: '',
        isSuccessMessage: false,
        successMessage: 'success.data.message'
    }

    

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            // // check if the input is an email

            const { email } = this.state;
            let isEmail = validator.isEmail(email)
            
            if (isEmail) {
                this.setState({
                    isError: false,
                    errorMessage: ''
                })
            } else {
                this.setState({
                    isError: true,
                    errorMessage: 'Please enter a correct email'
                })
            }
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            const { password } = this.state
            let isPassword = validator.matches(
                password,
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
            if (isPassword) {
                this.setState({
                    isPasswordError: false,
                    isPasswordErrorMessage: ''
                })
            } else {
                this.setState({
                    isPasswordError: true,
                    isPasswordErrorMessage: 'password must contain a lowercase, an uppercase, and a symbol',
                })
            }
        })
    }

    handleOneSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = this.state

        if (validator.isEmpty(email) && validator.isEmpty(password)) {
            this.setState({
                isSubmitError: true,
                submitErrorMessage: 'cannot have empty email or password'
            })
            return;
        } else {
            this.setState({
                isSubmitError: false,
                submitErrorMessage: ''
            })
        };

        if (validator.isEmpty(email)) {
            console.log('email is empty')
            this.setState({
                isSubmitError: true,
                submitErrorMessage: 'cannot have empty email'
            })
            return;
        } else {
            this.setState({
                isSubmitError: false,
                submitErrorMessage: ''
            })

        }

        if (validator.isEmpty(password)) {
            console.log('pw is empty')
            this.setState({
                isSubmitError: true,
                submitErrorMessage: 'cannot have empty password'
            })
        } else {
            this.setState({
                isSubmitError: false,
                submitErrorMessage: ''
            })
        }

        try {
            let success = await axios.post('http://localhost:3003/api/users/create-user', {
                email: email,
                password: password
            })
            console.log(success.data.message)

            this.setState({
                isAuth: true,
                isSuccessMessage: true,
                successMessage: success.data.message,
                email: '',
                password: '',
            })
        }
        catch (e) {
    
            if (e && e.response.status === 401) {
                this.setState({
                    isAuth: false,
                    isSuccessMessage: false,
                    isError: true,
                    errorMessage: e.response.data.message
                })
            }
            console.log('isAuth', this.state.isAuth)
        }

    }


    render() {
        const {
            email,
            password,
            isAuth,
            isError,
            errorMessage,
            isPasswordError,
            isPasswordErrorMessage,
            isSubmitError,
            submitErrorMessage,
            isSuccessMessage,
            successMessage
        } = this.state

console.log('line159', isAuth)

        let showTodoComponent = isAuth
            ? <Todo />
            : (
                <>
                    <form onSubmit={this.handleOneSubmit}>
                        {" "}
                        {/* {isSuccessMessage
                            ? <p className="success-message">{successMessage}</p>
                            : <p></p>
                        } */}
                        {isSuccessMessage
                            ? (<Message className={'success-message'} message={successMessage} />)
                            : ("")
                        }

                        <p>{this.state.successLoginMessage}</p>

                        {/* {isSubmitError
                            ? <p className="error-message">{submitErrorMessage}</p>
                            : ""} */}

                        {isSubmitError
                            ? (<Message className={'error-message'} message={errorMessage} />)
                            : ("")}

                        {/* {isError ? <p className ="error-message">{errorMessage}</p> : ""} */}

                        {isError
                            ? (<Message className={'error-message'} message={errorMessage} />)
                            : ("")
                        }
                        <input
                            type="text"
                            name="email"
                            placeholder="enter email"
                            onChange={this.handleOnChange}
                            value={email}
                        /><br />{" "}

                        {/* {isPasswordError
                            ? <p className="error-message">{isPasswordErrorMessage}</p>
                            : ""
                        } */}

                        {isPasswordError
                            ? (<Message className={'error-message'} message={isPasswordErrorMessage} />)
                            : ("")
                        }
                        <input
                            type="text"
                            name="password"
                            placeholder="enter password"
                            onChange={this.handleOnChangePassword}
                            value={password}
                        /><br />{" "}
                        <button className='blue-button'>Register</button>

                    </form>
                </>
            )

        return (
            <div style={{ textAlign: "center", marginTop: 20 }}>
                {showTodoComponent}
            </div>
        )
    }
}

export default Register

