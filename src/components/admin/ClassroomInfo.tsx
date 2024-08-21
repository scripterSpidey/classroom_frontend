import React, { useEffect, useState } from 'react'
import { ClassroomSchema } from '../../schema/classroom.schema'
import handleError from '../../utils/error.handler';
import admin from '../../api/services/admin.services';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

import { useNavigate, useParams } from 'react-router-dom';


const ClassroomInfo = () => {
  const navigate = useNavigate()
  const [classroom, setClassroom] = useState<ClassroomSchema | null>(null);
  const { classroomId } = useParams()

  if (!classroomId) {
    navigate('/admin/teachers');
    return
  }
  useEffect(() => {
    const fetchClassroomInfo = async () => {
      try {
        const data = await admin.fetchClassroomInfo(classroomId);
        setClassroom(data)
      } catch (error) {
        handleError(error)
      }
    }
    fetchClassroomInfo();
  }, []);

  console.log(classroom)
  return (
    <div className='h-full bg-gradient-to-b from-blue-900 to-neutral-900 rounded-lg'>
      {classroom &&
        <div className='h-full p-5'>
          <div className='h-1/2 flex '>
            <div className='  w-1/5 aspect-square mr-5  justify-center bg-gradient-to-t from-blue-800 to-blue-300 rounded-lg items-center flex  self-end'>
              <div className='text-8xl  '>
                <SchoolRoundedIcon fontSize='inherit' />
              </div>
            </div>
            <div className='self-end flex gap-1 flex-col'>
              <h1 className='text-6xl  font-extrabold '>{classroom.subject}</h1>
              <h2 className='text-2xl  font-bold text-white text-opacity-70'>{classroom.name}</h2>
              <h2 className='text-2xl font-bold text-white text-opacity-70'>{classroom.class_teacher_name}</h2>
              <h2 className='text-xl font-semibold text-white text-opacity-70'>Strength - {classroom.students.length}</h2>
            </div>
            <div className='self-end ml-auto mr-10'>

            </div>
          </div>
        </div>}
    </div>
  )
}

export default ClassroomInfo