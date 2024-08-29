import React from 'react'
import useRole from '../hooks/useRole'
import { Outlet } from 'react-router-dom'

const Exams = () => {
    const role = useRole()
    return (
        <div className='h-full bg-gray-50 rounded-lg flex flex-col items-center border-2  shadow-md border-gray-200 w-full'>
            <Outlet></Outlet>
        </div>
    )
}

export default Exams