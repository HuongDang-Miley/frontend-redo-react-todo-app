import React from "react"
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({Component, isAuth, ...rest }) => {
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