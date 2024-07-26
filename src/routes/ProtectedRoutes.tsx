import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';

interface DashboardProps {
    role: 'student' | 'teacher'
}
const ProtectedRoutes: React.FC<DashboardProps> = ({ role }) => {
    const user = role == 'student' ?
        useAppSelector(state => state.studentAuth.user) :
        useAppSelector(state => state.teacherAuth.user)

    console.log('user in protected route', user)
    // const user = false
    return user ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoutes