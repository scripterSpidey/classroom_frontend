import { Outlet,Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/store';

const PreventBackHome = () => {
    const user = useAppSelector(state=>state.studentAuth.user);
    return user ?  <Navigate to='/student/dashboard'/> : <Outlet/>
}

export default PreventBackHome