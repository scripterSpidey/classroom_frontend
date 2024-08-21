import React, { useEffect, useState } from 'react'
import { StudentSchema } from '../../schema/student.schema'
import { ReadableDate } from '../../utils/indian.std.time'
import handleError from '../../utils/error.handler'
import admin from '../../api/services/admin.services'

const StudentsPage = () => {
    const [students, setStudents] = useState<StudentSchema[]>([])
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await admin.students();
                setStudents(data)
            } catch (error) {
                handleError(error)
            }
        }
        fetchStudents()
    }, [])

    console.log(students);
    return (
        <div className='bg-neutral-900  rounded-lg h-full p-5 m-2 mt-0 ml-0 ' >
            <h1 className='text-3xl font-bold'>
                Students
            </h1>
            <div className='mt-10 p-3'>
                <table className='w-full'>
                    <thead>
                        <tr >
                            <th className='text-start pl-5'>#</th>
                            <th className='text-start'>Name</th>
                            <th className='text-start'>Email</th>
                            <th className='text-start'>Member Since</th>
                            <th className='text-start'>Enrolled Classrooms</th>
                            {/* <th className='text-start'>Action</th> */}
                        </tr>
                    </thead>
                    <tbody className='space-y-10'>
                        <tr>
                            <td colSpan={6} >
                                <hr className='my-3 border-white border-opacity-10 ' />
                            </td>
                        </tr>
                        {students.map(student =>
                            <tr className='hover:bg-neutral-800 text-gray-200 font-light' >
                                <td className=' py-4 pl-5  text-start rounded-l-lg'>1</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{ReadableDate(student.createdAt)}</td>
                                <td>{student.classrooms.length}</td>
                                {/* <td className='rounded-r-lg'>Block</td> */}
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentsPage