import React from 'react'
import ClassroomNavBar from '../components/ClassroomNavBar';
import { Outlet } from 'react-router-dom';

const ClassroomLayout = () => {
  return (
    <div className='flex '>
        <ClassroomNavBar/>
        <div className='w-full m-4 '>
            <Outlet/>
        </div>
    </div>
  )
}

export default ClassroomLayout