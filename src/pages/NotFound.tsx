import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='h-screen'>
            <h1 className='text-3xl'>Page Not Found</h1>
            <Link to="student">
                Back to dashboard
            </Link>
    </div>
  )
}
