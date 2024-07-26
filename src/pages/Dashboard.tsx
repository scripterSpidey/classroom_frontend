
import { Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppSelector, useAppDispatch } from '../store/store';
import { registerUser } from '../store/slices/register.slice';

interface DashboardProps {
    role: 'student' | 'teacher' 
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {

    const dispatch = useAppDispatch()
    const newUser = useAppSelector(state => state.userRegistry)
    if (newUser) dispatch(registerUser(null));

    console.log('role in dashboard: ',role)
    
    return (
        <>
            <div className=' h-screen rounded-lg    sm:p-4 sm:my-10 sm:mx-10 border shadow-lg '>
                <div className=' px-4 flex justify-center p-3   rounded-md'>
                    <Button className='bg-costume-primary-color p-2 px-3  text-white' variant="outlined" startIcon={<AddCircleIcon />}>
                        {role=="student" ? "JOIN" :"CREATE" } A NEW CLASSROOM
                    </Button>
                </div>

                <hr className='m-4' />
                <div className="relative flex-shrink-0 min-h-40 max-w-xs mx-2 mb-6 overflow-hidden bg-blue-500 rounded-lg shadow-lg">
                    <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none">
                        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="#6da3fb">
                        </rect>
                        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="#6da3fb">
                        </rect>
                    </svg>
                    {/* <div className="relative flex items-center justify-center px-10 pt-10">
                        <div className="absolute bottom-0 left-0 block w-48 h-48 ml-3 -mb-24">
                        </div>
                        <picture>
                            <source srcSet="/images/object/5.webp" type="image/webp" />
                            <source srcSet="/images/object/5.png" />
                            <img className="relative w-40" src="/images/object/5.png" alt="shopping item" />
                        </picture>
                    </div> */}
                    <div className="absolute w-full bottom-0 flex flex-col space-y-2  px-6  pb-6 mt-6 text-white">
                        <span className="block text-2xl font-bold text-black -mb-1 ">
                            English
                        </span>
                        <div className="flex justify-between">
                            <span className="block text-xl">
                                Ahammed Zulaikh
                            </span>
                            {/* <span className="flex items-center px-3 py-2 text-xs font-bold leading-none text-yellow-500 bg-white rounded-full">
                                $36.00
                            </span> */}
                        </div>
                        <div className='flex flex-col items-end w-full '>
                            <button type="button"
                                className="py-2 px-4  bg-costume-primary-color hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  
                                transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Enter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard