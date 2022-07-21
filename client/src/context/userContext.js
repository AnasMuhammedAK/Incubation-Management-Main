import axios from 'axios'
import React, { useEffect, useState ,createContext} from 'react'
const AuthContext=createContext()
function UserContext(props) {
    const [loggedIn, setLoggedIn] = useState(undefined)

    async function getLoggedIn(){
        const loggedInRes=await axios.get('http://localhost:3001/loggedIn') 
        setLoggedIn(loggedInRes.data)
    }

    useEffect(() => {
        getLoggedIn()
    }, [])
    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
        
    )
}
export default AuthContext
export  {UserContext}
