
import Logo from './Logo'
import Button from './basic_elements/Button'
import { Outlet } from 'react-router-dom'

const Header = () => {
  return <>
    <header className='bg-costume-secondary-color  top-0 right-0 z-50 left-0 p-7 shadow-md w-full flex justify-between sm:px-4 md:px-6 lg:px-20 px-4'>
        <Logo/>
        <div className='hidden sm:flex items-center justify-center text-lg'>
          <a href="#" className='mx-6'>Home</a>
          <a href="#" className='mx-6'>About</a>
          <a href="#" className='mx-6'>Contact</a>
        </div>
        <div className=' flex items-center justify-center space-x-2 xs:space-x-4'>
          {/* <button className='bg-costume-primary-color  text-white whitespace-nowrap  rounded-md  text-sm  px-2 py-1 xs:py-2 xs:px-3 xs:text-md font-bold'>Sign up</button>
          <button className='bg-costume-secondary-color border border-black font-bold text-black text-sm px-2 py-1 rounded-md whitespace-nowrap xs:py-2 xs:px-3 xs:text-md '>Sign in</button> */}
          <Button buttonClass="primary-button" >Sign Up</Button>
          <Button buttonClass="secondary-button border" >Sign In</Button>
        </div>
    </header> 

    <Outlet></Outlet>
  </>
}

export default Header