import React, { useEffect } from 'react'
import ClassroomNavBar from '../components/ClassroomNavBar';
import { Outlet } from 'react-router-dom';
import { fetchClassroomDetailsForStudent } from '../api/services/student.classroom.services';
import { fetchClassroomDetailsForTeacher } from '../api/services/teacher.classroom.services';
import { fetchClassroomDetailsForStudentThunk } from '../store/slices/student.classroom.slice';
import { fetchClassroomDetailsForTeacherThunk } from '../store/slices/teacher.classroom.slice';

import useRole from '../hooks/useRole';
import { useAppDispatch, useAppSelector } from '../store/store';
import { ClassroomSchema } from '../schema/classroom.schema';
import { StudentSchema } from '../schema/student.schema';
import { TeacherSchema } from '../schema/teacher.schema';
import { Toaster } from 'react-hot-toast';

const ClassroomLayout = () => {

  const role = useRole();
  const dispatch = useAppDispatch();
  let user: TeacherSchema | StudentSchema | null = null;

  let classroomInfo: ClassroomSchema | null = null;
  let classroom_id: string | null = null;
  if (role == 'teacher') {
    classroom_id = useAppSelector(state => state.persistedData.teacherDatas?.classroom_id!);
    user = useAppSelector(state => state.teacherAuth.user);
    classroomInfo = useAppSelector(state => state.teacherClassroom.classroom);

  } else if (role == 'student') {
    classroom_id = useAppSelector(state => state.persistedData.studentDatas?.classroom_id!)
    user = useAppSelector(state => state.studentAuth.user);
    classroomInfo = useAppSelector(state => state.studentClassroom.classroom);
  }
  useEffect(() => {
    const fetchClassrooms = () => {
      if (user?._id) {
        role == 'student' ?
          dispatch(fetchClassroomDetailsForStudentThunk(() => fetchClassroomDetailsForStudent(classroom_id!))) :
          dispatch(fetchClassroomDetailsForTeacherThunk(() => fetchClassroomDetailsForTeacher(classroom_id!)))
      } else {
        console.error('User ID is undefined in dashboard');
      }
    }

    fetchClassrooms()

  }, [dispatch]);


  return (
    <div className='flex  flex-1'>
      <ClassroomNavBar />
      <div className='w-full m-4 flex-1 '>
        <Outlet />
      </div>
      <Toaster></Toaster>
    </div>
  )
}

export default ClassroomLayout