import React from 'react'
import useRole from '../hooks/useRole'
import { NavLink } from 'react-router-dom';
import useGetExams from '../hooks/useGetExams';
import { useAppSelector } from '../store/store';
import { convertToIST } from '../utils/indian.std.time';
import TimerIcon from '@mui/icons-material/Timer';
import Filter1Icon from '@mui/icons-material/Filter1';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const AllExams = () => {
    const role = useRole();
   
    useGetExams();

    const allExams = role == 'teacher' ?
        useAppSelector(state => state.teacherClassroom.exams) :
        useAppSelector(state => state.studentClassroom.exams)
    return (
        <div className='w-full'>
            {role == 'teacher' &&
                <div>
                    <div className='w-full  flex py-5 justify-center'>
                        <NavLink to='new'>
                            <button
                                className='primary-btn py-2 font-semibold'> CREATE EXAM</button>
                        </NavLink>
                    </div>
                    <hr className='border mx-2' />
                </div>}
            <div className='w-full  p-4  '>
                {allExams.map(exam =>
                    <div key={exam._id}
                        className='w-full border-2 mb-4 sm:flex justify-between items-center shadow-sm p-3 px-6 rounded-lg'>
                        <div className='space-y-1 w-full sm:w-3/5 mr-2'>
                            <h2 className='text-xl font-semibold text-costume-primary-color'>{exam.title}</h2>
                            <h4 className='text-lg font-semibold'>Exam starts at: {convertToIST(exam.start_time)}</h4>
                            <div className='flex gap-3 items-center'>
                                <TimerIcon />
                                <h5 className='font-bold '>{`${exam.duration} minutes`}</h5>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <Filter1Icon />
                                <h5 className='font-bold '>{`${exam.total_marks} marks`}</h5>
                            </div>
                            <div className='flex gap-3 items-center'>
                                <QuestionMarkIcon />
                                <h5 className='font-bold '>{`${exam.total_questions} questions`}</h5>
                            </div>
                        </div>
                        {role=='student'&& 
                        ( (new Date(exam.start_time).getTime() <= Date.now()) &&  Date.now()  <= new Date(exam.last_time_to_start).getTime()) &&
                        <div>
                            <button className='primary-btn'>Attend</button>
                        </div>}
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default AllExams