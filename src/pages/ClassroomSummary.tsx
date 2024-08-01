
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import classroomImage from "../assets/images/classroom.jpg"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {  useNavigate, useParams } from 'react-router-dom';

import useRole from '../hooks/use.role.hook';
import { useEffect, useState } from 'react';

import JoiningRequestTable from '../components/teacher/JoiningRequest';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchClassroomDetailsForTeacherThunk, removeClassroom, } from '../store/slices/teacher.classroom.slice';
import { fetchClassroomDetailsForStudent, fetchClassroomDetailsForTeacher } from '../api/services/classroom.services';

import { fetchClassroomDetailsForStudentThunk } from '../store/slices/student.classroom.slice';

const ClassroomSummary = () => {

  console.log('clasroomsummary rendered');

  const {classroom_id} = useParams();
  const dispatch = useAppDispatch()
  const [openReqeusts, setOpenRequests] = useState<boolean>(false);
  const navigate = useNavigate();
  const role = useRole();

  const user = role == 'teacher' ?
    useAppSelector(state => state.teacherAuth.user) :
    useAppSelector(state => state.studentAuth.user)

  useEffect(() => {
    if (user?._id) {
      role == 'student' ?
      dispatch(fetchClassroomDetailsForStudentThunk(() => fetchClassroomDetailsForStudent(classroom_id!))):
      dispatch(fetchClassroomDetailsForTeacherThunk(()=>fetchClassroomDetailsForTeacher(classroom_id!)))
    } else {
      console.error('User ID is undefined in dashboard');

    }
  }, [dispatch, user?._id]);



  const classroomInfo = role == 'teacher' ?
  useAppSelector(state => state.teacherClassroom.classroom):
  useAppSelector(state=>state.studentClassroom.classroom);

  const handleExit = () => {
    dispatch(removeClassroom())
    navigate(`/${role}/dashboard`)
  }

  return (
    <div className={`w-full   h-full p-5 rounded-lg`}>
      <div
        style={{
          backgroundImage: `url(${classroomImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className={`rounded-md shadow-lg relative`}>
        <div className="absolute inset-0 bg-black z-0 opacity-30 rounded-md"></div> {/* Overlay */}
        <div className=' relative  p-8 border-2 z-10  flex shadow-xl justify-between rounded-md'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-5xl  text-white font-bold'>{classroomInfo?.subject}</h1>

            <span className='text-3xl text-white'>{classroomInfo?.name}</span>

          </div>

          <button
            onClick={handleExit}
            className="inline-flex self-center bg-costume-primary-color items-center gap-2 
            rounded-md px-4 py-2 text-sm text-white hover:bg-red-400  focus:relative
            transition duration-300 ease-in-out">
            <ExitToAppIcon />Exit</button>
        </div>
      </div>

      <div className='flex justify-between py-3 px-8'>
        <div className='flex flex-col '>
          <span className='text-2xl font-semibold '>{classroomInfo?.class_teacher_name}</span>
          <span className='text-lg ' >{role=='teacher' && classroomInfo?.class_teacher_id}</span>
          <span className='text-lg'>Strength: {classroomInfo?.students.length}</span>
        </div>
        {role=='teacher' && <button
          
          onClick={() => setOpenRequests(true)}
          className="relative inline-flex self-center bg-costume-primary-color items-center gap-2 
            rounded-md px-4 py-2 text-sm text-white hover:bg-gray-400  focus:relative
            transition duration-300 ease-in-out">
          <GroupAddIcon />
          <span>Requests</span>
          {classroomInfo && (classroomInfo.joining_requests.length != 0 &&
            <span className='absolute -top-1 -right-1 p-3 h-4 w-4 rounded-full flex items-center justify-center bg-red-600'>{classroomInfo.joining_requests.length}</span>)}
        </button>}
      </div>
      <hr />
      <div className='p-5'>
        <div className="flex flex-col border-2 rounded-md p-4">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">S.NO</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {classroomInfo && classroomInfo.students.map((student, index) =>
                      <tr key={student._id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + 1}</td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          {/* <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button> */}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {classroomInfo && (openReqeusts && <JoiningRequestTable
        requests={classroomInfo.joining_requests}
        classroom_id={classroomInfo._id}
        closeRequests={setOpenRequests} />)}

    </div>
  )
}

export default ClassroomSummary