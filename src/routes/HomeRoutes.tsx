import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/store';

interface HomeRoutesProps {
    role: 'student' | 'teacher'
}


const HomeRoutes: React.FC<HomeRoutesProps> = ({ role }) => {
    // const user = false;
    const user = role == 'student' ?
        useAppSelector(state => state.studentAuth.user) :
        useAppSelector(state => state.teacherAuth.user) ;
    console.log(`${role} on home route: `,user)
    return user ? <Navigate to={`/${role}/dashboard`} /> : <Outlet />
}

export default HomeRoutes