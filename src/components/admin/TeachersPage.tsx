import React, { useEffect, useState } from 'react'
import handleError from '../../utils/error.handler'
import admin from '../../api/services/admin.services'
import { TeacherSchema } from '../../schema/teacher.schema'
import { ReadableDate } from '../../utils/indian.std.time'
import { useNavigate } from 'react-router-dom'

const TeachersPage = () => {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState<TeacherSchema[]>([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const data = await admin.teachers();
                console.log('teachers: ', data)
                setTeachers(data)
            } catch (error) {
                handleError(error)
            }
        }
        fetchTeachers()
    }, [])

    console.log('teachers: ', teachers)
    return (
        <div className='bg-neutral-900  rounded-lg h-full p-5 m-2 mt-0 ml-0 ' >
            <h1 className='text-3xl font-bold'>
                Teachers
            </h1>
            <div className='mt-10 p-3'>
                <table className='w-full'>
                    <thead>
                        <tr >
                            <th className='text-start pl-5'>#</th>
                            <th className='text-start'>Name</th>
                            <th className='text-start'>Email</th>
                            <th className='text-start'>Member Since</th>
                            <th className='text-start'>Classrooms</th>
                            {/* <th className='text-start'>Action</th> */}
                        </tr>
                    </thead>
                    <tbody className='space-y-10'>
                        <tr>
                            <td colSpan={6} >
                                <hr className='my-3 border-white border-opacity-10 ' />
                            </td>
                        </tr>
                        {teachers.map(teacher =>
                            <tr
                                onClick={() => navigate(`/admin/teacher/${teacher._id}`)}
                                className='hover:bg-neutral-800 cursor-pointer text-gray-200 font-light' >
                                <td className=' py-4 pl-5  text-start rounded-l-lg'>1</td>
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>{ReadableDate(teacher.createdAt)}</td>
                                <td>{teacher.classrooms.length}</td>
                                {/* <td className='rounded-r-lg'>Block</td> */}
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeachersPage