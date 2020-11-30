import React from 'react'
import {Link} from 'react-router-dom'

export const Home = () => {
    return (
        <div className ='body-div'>
            THE GREATEST TODO APP ON THE PLANET!<br /><br />
            <Link to='/Register'>Click Here To Register</Link>
        </div>
    )
}
export default Home

