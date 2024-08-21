import React, { useEffect, useState } from 'react'
import { TeacherSchema } from '../../schema/teacher.schema';
import handleError from '../../utils/error.handler';
import admin from '../../api/services/admin.services';
import { useNavigate, useParams } from 'react-router-dom';


const TeacherProfile = () => {
    const { teacherId } = useParams();
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState<TeacherSchema | null>(null);

    if (!teacherId) {
        navigate('/admin/teachers');
        return
    }

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const data = await admin.fetchTeacherInfo(teacherId);
                setTeacher(data);
            } catch (error) {
                handleError(error)
            }
        }

        fetchTeacher();
    }, []);

    console.log('teacher', teacher)
    return (
        <div className='bg-neutral-900 h-full rounded-lg '>
            {teacher &&
                <div className='relative  p-5 overflow-hidden rounded-lg'>
                    <div 
                        className='absolute inset-0 z-0 blur-lg '
                        style={{
                            backgroundImage: `url(${teacher.profile_image})`,
                            backgroundSize: '200%',
                            backgroundPosition: 'top left',
                            backgroundRepeat: 'no-repeat'
                        }}></div>
                    <div className='text-2xl p-5   flex z-10 relative mb-5'>
                        <p className='text-white text-opacity-30 hover:underline cursor-pointer'>Teachers</p>
                        <p className=''>/ Profile</p>
                    </div>
                    <div className='w-full flex items relative'>
                        <div className='w-1/5 h-1/5 mr-3 '>
                            <img src={`${teacher.profile_image}`}
                                className='rounded-lg'
                                alt="" />
                        </div>
                        <div className='p-1 self-end '>
                            <p className='text-3xl font-extrabold '>{teacher.name}</p>
                            <p className=''>{teacher.email}</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default TeacherProfile