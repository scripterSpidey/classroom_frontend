import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Logo from './Logo'
import {  useAppSelector,useAppDispatch } from '../store/store';
import { logoutStudent } from '../api/services/student.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { removeStudent } from '../store/slices/student.auth.slice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  flexDirection: "column",
  alignItems: "centre",

};

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const [logout, setLogout] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.studentAuth.user);
  console.log(user)
  if (!user)  navigate('/')
  const handleLogout = async () => {
    try {
      console.log('click')
      const response = await logoutStudent({ userId: user?.id as string });

      console.log(response)

      dispatch(removeStudent())
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <header className="bg-costume-secondary-color shadow-md text-white p-4 flex items-center  justify-between sm:px-10">

        <div className="flex items-center space-x-4">
          <Logo />
        </div>
        <div>
          <h1 className="text-xl hidden sm:flex sm:text-2xl  font-extrabold text-costume-primary-color ">STUDENT DASHBOARD</h1>
        </div>
        <div className="relative" >
          <div className="flex items-center space-x-2 bg-costume-primary-color p-2 rounded-lg hover:bg-gray-600 focus:outline-none">
            <img src="/path/to/profile-icon.png" alt="Profile Icon" className="h-8 w-8 rounded-full" />
            <div className="hidden lg:flex flex-col text-sm">
              <Link to={"profile"} className="font-semibold">{user?.name}</Link>
              <span>{user?.email}</span>
            </div>
            <Button
              onClick={() => setOpen(prevOpen => !prevOpen)}
              size="small">
              <ArrowDropDownIcon />
            </Button>
          </div>
          {open &&
            <div
              className={`absolute transition-all right-0 mt-2 w-48 bg-white z-10 text-gray-800 border border-gray-200 rounded-md shadow-lg hidden lg:block `}>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
              <a onClick={() => setLogout(true)} className="block px-4 py-2 cursor-pointer text-sm hover:bg-gray-100">Logout</a>
            </div>}
        </div>

        <Modal
          open={logout}
          onClose={() => setLogout(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography sx={{ alignItems: "center", marginBottom: 4 }} id="modal-modal-title" variant="h6" component="h2">
              Are you sure want to logout?
            </Typography>
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',  
                paddingX: "20px"
              }}
              direction="row">
              <Button
                onClick={handleLogout}
                sx={{
                  bgcolor: "#295782"
                }} variant="contained">Confirm</Button>
              <Button
                onClick={() => setLogout(false)}
                sx={{
                  border: "2px solid #000"
                }}
                variant="outlined">Cancel</Button>
            </Stack>
          </Box>
        </Modal>
      </header>
      <Outlet></Outlet>
    </>

  )
}

export default DashboardHeader