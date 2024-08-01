import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import useRole from '../hooks/use.role.hook';
import { useAuth } from '../hooks/use.auth';

interface DashboardProps {

}
const ProtectedRoutes: React.FC<DashboardProps> = () => {
    const role = useRole();
    const navigate = useNavigate()
    const { loading, user, error } = useAuth(role);
    console.log('API user from protected: ', user)
    //    const user = role == 'student' ?
    //    useAppSelector(state => state.studentAuth.user) :
    //    useAppSelector(state => state.teacherAuth.user)

    if (loading) return null
    if (error) navigate('/');

    return user ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoutes