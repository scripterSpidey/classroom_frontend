
import useRole from '../hooks/useRole'
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../store/store';
import { convertToIST } from '../utils/indian.std.time';
import TimerIcon from '@mui/icons-material/Timer';
import Filter1Icon from '@mui/icons-material/Filter1';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { ExamAttendedType, ExamsSchema } from '../schema/exams.schema';

const AllExams = () => {
    const role = useRole();
    const navigate = useNavigate();
    const student = useAppSelector(state => state.studentAuth.user)
    const allExams = role == 'teacher' ?
        useAppSelector(state => state.teacherClassroom.exams) :
        useAppSelector(state => state.studentClassroom.exams);

    const isPassed = (submissions: ExamAttendedType[]): JSX.Element => {
        const submission = submissions.find(submission => submission.student_id == student?._id);
        if (submission?.valuated == false) return <button className='warning-btn'>Valuation pending</button>
        if (submission?.result == 'pass') {
            return <div className=' flex items-center gap-2'>
                <button className='success-btn'>Passed</button>
                <h1 className='font-bold'>Score: <span>{submission.obtained_mark}</span></h1>
            </div>
        }
        if (submission?.result == 'fail'){
            return <div className=' flex items-center gap-2'>
                <button className='danger-btn'>Fail</button>
                <h1 className='font-bold'>Score: <span>{submission.obtained_mark}</span></h1>
            </div>
        }
        return <button></button>
    }

    const statusButtons = (startDate: string, lastDate: string, exam: ExamsSchema) => {
        if (exam.attended.some(submission => submission.student_id == student?._id)) {
            return <button className='success-btn w-full'>Submitted</button>
        }
        if (Date.now() > new Date(lastDate).getTime() && !exam.attended.some(submission => submission.student_id == student?._id)) {
            return <button className='danger-btn w-full'>Not submitted</button>
        }
        if (Date.now() >= new Date(startDate).getTime() && Date.now() <= new Date(lastDate).getTime() && !exam.attended.some(submission => submission.student_id == student?._id)) {
            return <button className='success-btn w-full'>On Going</button>
        }
        if (Date.now() >= new Date(startDate).getTime() && Date.now() <= new Date(lastDate).getTime() && exam.attended.some(submission => submission.student_id == student?._id)) {
            return <button className='success-btn w-full'>Submitted</button>
        }

    }
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
                        {role == 'student' &&
                            <div>
                                {isPassed(exam.attended)}
                            </div>}
                        {role == 'student' &&
                            <div className='bg-green-300 w-full sm:w-auto'>
                                {statusButtons(exam.start_time, exam.last_time_to_start, exam)}
                            </div>}
                        {/* {role=='student'&& ( (new Date(exam.start_time).getTime() <= Date.now()) &&  Date.now()  <= new Date(exam.last_time_to_start).getTime()) && */}
                        <div className=' w-full mt-3 sm:mt-0 sm:w-auto'>
                            <button
                                onClick={() => navigate(`view/${exam._id}`)}
                                className='primary-btn w-full'>View</button>
                        </div>
                        {/* // } */}
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default AllExams