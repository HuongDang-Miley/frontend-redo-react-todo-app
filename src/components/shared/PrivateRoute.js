import React from "react"
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({Component, isAuth, ...rest }) => {
    console.log('isAuth in privateRoute',isAuth)
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuth
                    ? <Component {...props} isAuth={isAuth} />
                    : <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute;