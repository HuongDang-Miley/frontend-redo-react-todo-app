import React from 'react'

export const Nav = ({
    isAuth,
    handleLogoutLink,
    handleLoginLink }) => {
    return (
        <div className="navigation-div">
            {isAuth
                ? <>
                    <a>Email</a>
                    <a onClick={() => handleLogoutLink()}>Logout</a>
                </>
                : <>
                    <a onClick={()=>handleLoginLink()}>Login</a>
                    <a>Register</a>
                </>}
        </div>
    )
}

export default Nav