import React from "react"
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({Component, isAuth, user, ...rest }) => {
    console.log('isAuth in privateRoute',isAuth)
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuth
                    ? <Component {...props} isAuth={isAuth} user={user}/>
                    : <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute;