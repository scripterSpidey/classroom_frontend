import { Outlet, Navigate } from 'react-router-dom'

import useRole from '../hooks/use.role.hook';
import { useAuth } from '../hooks/use.auth';

interface HomeRoutesProps {

}


const HomeRoutes: React.FC<HomeRoutesProps> = () => {
    console.log('Rendered home route checker...')
    const role = useRole();

    const { loading, user } = useAuth(role);

    if (loading) return null;

    // const user = false;
    // const user = role == 'student' ?
    // useAppSelector(state => state.studentAuth.user) :
    // useAppSelector(state => state.teacherAuth.user) ;


    return user ? <Navigate to={`/${role}/dashboard`} /> : <Outlet />
}

export default HomeRoutes