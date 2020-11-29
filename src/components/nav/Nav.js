import React from 'react'

export const Nav = ({ isAuth }) => {
    console.log(isAuth)
    return (
        <div className = "navigation-div">
            {isAuth
                ? <>
                    <a>Email</a>
                    <a>Logout</a>
                </>
                : <>
                    <a>Login</a>
                    <a>Register</a>
                </>}
        </div>
    )
}

export default Nav