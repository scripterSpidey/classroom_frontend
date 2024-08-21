import React from 'react'
import AdminHeader from './components/AdminHeader'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './components/AdminSidebar'

const AdminLayout = () => {
    return (
        <div className='bg-black flex flex-col gap-3 text-white h-screen'>
            <AdminHeader />

            <div className='flex flex-col flex-grow'> {/* This div grows vertically */}
                <div className='flex flex-row flex-grow'> {/* This div arranges children horizontally */}
                    <AdminSidebar/> {/* Adjust width as needed */}
                    <div className='flex-grow '>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout