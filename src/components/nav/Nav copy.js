import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

export default class Nav extends Component {

    state = {
        isAuth: false,
        user: null
    }

    componentDidMount() {
        let token = localStorage.getItem("jwtToken")
        console.log('token', token)

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
                console.log('this.state in nav',this.state)
            }
        }
    }


    logout = () => {
        localStorage.removeItem("jwtToken");
        this.props.logout();
      };
      

    render() {
        const { isAuth, user } = this.state
        console.log('isAuth line 44 from Nav', isAuth)
        console.log('user line 45 from Nav', user)
        return (
            isAuth && user
                ? (
                    <div className="navigation-div">
                        <ul>
                            <li className="nav-link">
                                <Link to="/profile">{user.email}</Link>
                            </li>
                            <li className="nav-link">
                                <Link
                                    to="Register"
                                    onClick={this.logout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                )
                : (
                    <div>
                        <ul>
                            <li className="nav-link">
                                <Link to="Login">Login</Link>
                            </li>
                            <li className="nav-link">
                                <Link to="Register">Register</Link>
                            </li>
                        </ul>
                    </div>
                )

        )
    }
}
