
import { Outlet,Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';

const ProtectedRoutes = () => {
    const user = useAppSelector(state=>state.studentAuth.user)
    // const user = false
    return user ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoutes