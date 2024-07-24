
import { Button } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppSelector, useAppDispatch } from '../store/store';
import { registerUser } from '../store/slices/register.slice';

const Dashboard = () => {
   
    const dispatch = useAppDispatch()
    const newUser = useAppSelector(state => state.userRegistry)
    if (newUser) dispatch(registerUser(null))

    return (
        <>
            <div className=' h-screen rounded-lg   sm:p-4 sm:my-10 sm:mx-10 border shadow-lg '>
                <div className='bg-gray-100 px-4 flex justify-between p-3 shadow-lg border border-gray-200 rounded-md'>
                    <h1 className='text-2xl font-bold'>Join a classroom</h1>
                    <Button className='bg-costume-primary-color text-white' variant="outlined" startIcon={<AddCircleIcon />}>
                        New
                    </Button>
                </div>
                <hr className='mt-4' />
                <div className="flex flex-wrap justify-between m-5 ">
                    <div className=" bg-neutral-50 shadow-lg flex flex-col w-52 border border-neutral-200 rounded-lg p-2 h-32 m-2 ">
                        <div className=' flex-grow rounded-lg  border-4 border-dashed  border-gray-200'>
                            content
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard