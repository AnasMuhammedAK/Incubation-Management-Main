import axios from 'axios'
import React, { useContext } from 'react'
import AuthContext from '../../context/userContext'

function LogouBtn() {

    const {getLoggedIn} = useContext(AuthContext)

    async function logout(){
        await axios.get('http://localhost:3001/logout')
        getLoggedIn()
    }
    return (
        <button onClick={}>
            Logout
        </button>
    )
}

export default LogouBtn
