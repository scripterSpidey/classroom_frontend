import React, { Children, useEffect, useLayoutEffect, useState } from 'react'

const AuthUser = () => {
  return (
    <div>AuthUser</div>
  )
}

const AuthProvider = ({Children})=>{
    const [token,setToken] = useState<string|null>();

    useEffect(()=>{
        const validateUser = ()=>{
            try {
                
            } catch (error) {
                
            }
        }
    })
}



export default AuthUser