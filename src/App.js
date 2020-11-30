import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Home from "./components/home/Home"
import Todo from "./components/todo/Todo"
import Nav from "./components/nav/Nav"
import jwtDecode from 'jwt-decode'
import PrivateRoute from './components/shared/PrivateRoute'
import { getLocalStorageToken } from './components/utils/helpers'


class App extends Component {
  state = {
    isAuth: false,
    user: null
  }

  auth = (jwtToken) => {
    let decoded = jwtDecode(jwtToken)
    console.log("line 17", jwtToken)
    this.setState({
      isAuth: true,
      user: {
        email: decoded.email,
        _id: decoded._id,
      }
    })
  }

  componentDidMount() {
    // let token = localStorage.getItem("jwtToken");
    let token = getLocalStorageToken()
    if (token !== null) {
      let decoded = jwtDecode(token);
      let currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        //this.props.history.push("/");
      } else {
        this.setState({
          isAuth: true,
          user: {
            email: decoded.email,
            _id: decoded._id,
          },
        });
      }
    }
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    this.setState({
      isAuth: false,
      user: null,
    });
  }

  render() {
    return (
      <Router>
        <Nav isAuth={this.state.isAuth} user={this.state.user} logout={this.logout} />
        <Switch>
          <Route path="/register" component={Register} auth={this.auth} />

          <Route
            exact path="/login"
            component={(props) => <Login {...props} auth={this.auth} />}
          />
          <PrivateRoute
            exact
            path="/todo"
            isAuth={this.state.isAuth}
            user={this.state.user}
            component={Todo}
          />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App