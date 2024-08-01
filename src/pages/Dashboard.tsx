
import { Button, Hidden } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppSelector, useAppDispatch } from '../store/store';
import { registerUser } from '../store/slices/register.slice';
import NewClassroomForm from '../components/teacher/NewClassroomForm';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { searchClassroomForStudent, getStudentClassrooms, getTeacherClassrooms, fetchClassroomDetailsForTeacher } from '../api/services/classroom.services';
import ClassroomCard from '../components/ClassroomCard';

import useRole from '../hooks/use.role.hook';
import JoinClassroomForm from '../components/students/JoinClassroomForm';

import handleError from '../utils/error.handler';

import { ClassroomSchema } from '../schema/classroom.schema';
import { motion } from 'framer-motion';
import { Opacity } from '@mui/icons-material';


const Dashboard: React.FC = () => {

    const role = useRole()
    const dispatch = useAppDispatch();

    const user = role == 'teacher' ?
        useAppSelector(state => state.teacherAuth.user) :
        useAppSelector(state => state.studentAuth.user)



    const classrooms = role == 'teacher' ?
        (useAppSelector(state => state.teacherAuth.user?.classrooms) || []) :
        (useAppSelector(state => state.studentAuth.user?.classrooms) || []);

    console.log('classrooms: ', classrooms)


    const [showForm, setShowForm] = useState(false);

    const newUser = useAppSelector(state => state.userRegistry);

    if (newUser) dispatch(registerUser(null));

    const handleClose = () => setShowForm(false);



    return (
        <>
            <div className='  rounded-lg    sm:p-4 sm:my-10 sm:mx-10 border shadow-lg '>
                <div className=' px-4 flex justify-center p-3   rounded-md'>
                    <Button
                        onClick={() => setShowForm(true)}
                        className='bg-costume-primary-color p-2 px-3  text-white' variant="outlined" startIcon={<AddCircleIcon />}>
                        {role == "student" ? "JOIN" : "CREATE"} A NEW CLASSROOM
                    </Button>
                </div>

                <hr className='m-4' />
                {/* flex flex-wrap justify-centre gap-4 p-4 */}
                {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'> */}
                <div className='flex flex-col gap-10 overflow-x-hidden'>
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.25
                                }
                            }
                        }}
                        initial="hidden"
                        animate="show"
                        className='grid grid-cols-4 gap-10 p-10'>
                        {classrooms.length != 0 && classrooms.map((classroom: ClassroomSchema) => <ClassroomCard
                            key={classroom._id}
                            name={classroom.name}
                            class_teacher_name={classroom.class_teacher_name}
                            subject={classroom.subject}
                            _id={classroom._id}
                            role={role}
                        />)}

                    </motion.div>
                </div>

                {/* </div> */}
                {role == 'teacher' ?
                    <NewClassroomForm onClose={handleClose} visible={showForm} /> :
                    <JoinClassroomForm visible={showForm} onClose={handleClose} />}

            </div>
            <Toaster position='top-right' />
        </>
    )
}

export default Dashboard