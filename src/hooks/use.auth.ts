import { useEffect, useState } from "react";
import { authenticateUser } from "../api/services/general.services";



export const useAuth = (role:string) =>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false)
    useEffect(()=>{
        setLoading(true)
        authenticateUser(role)
            .then(response => {
                console.log('response in hook: ',response)
                setUser(response);
            })
            .catch(error => {
                console.error('Error in useAuth:', error);
                setError(true)
            })
            .finally(()=>setLoading(false))
    },[])
    return {loading,user,error};
}