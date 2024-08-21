import React, { useDebugValue, useEffect, useState } from 'react'
import handleError from '../../utils/error.handler'
import admin from '../../api/services/admin.services'
import { ClassroomSchema } from '../../schema/classroom.schema'
import { ReadableDate } from '../../utils/indian.std.time'
import { useNavigate } from 'react-router-dom'

const ClassroomsPage = () => {
    const [classrooms, setClassrooms] = useState<ClassroomSchema[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const data = await admin.classrooms();
                setClassrooms(data)
            } catch (error) {
                handleError(error)
            }
        }
        fetchClassrooms();
    }, []);

    return (
        <div className='bg-neutral-900  rounded-lg h-full p-5 m-2 mt-0 ml-0 ' >
            <h1 className='text-3xl font-bold'>
                Classrooms
            </h1>
            <div className='mt-10 p-3'>
                <table className='w-full'>
                    <thead>
                        <tr >
                            <th className='text-start pl-5'>#</th>
                            <th className='text-start'>Name</th>
                            <th className='text-start'>Class teacher</th>
                            <th className='text-start'>Created at</th>
                            <th className='text-start'>Strength</th>
                            {/* <th className='text-start'>Action</th> */}
                        </tr>
                    </thead>
                    <tbody className='space-y-10'>
                        <tr>
                            <td colSpan={6} >
                                <hr className='my-3 border-white border-opacity-10 ' />
                            </td>
                        </tr>
                        {classrooms.map((classroom,index) =>
                            <tr
                                onClick={() => navigate(`/admin/classroom/${classroom._id}`)}
                                className='hover:bg-neutral-800 text-gray-200 font-light' >
                                <td className=' py-4 pl-5  text-start rounded-l-lg'>{index+1}</td>
                                <td >
                                    <p>{classroom.subject}</p>
                                    <p className='text-sm mt-1 text-white text-opacity-30'>{classroom.name}</p>
                                </td>
                                <td>{classroom.class_teacher_name}</td>
                                <td>{ReadableDate(classroom.createdAt)}</td>
                                <td>{classroom.students.length}</td>
                                {/* <td className='rounded-r-lg'>Block</td> */}
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClassroomsPage