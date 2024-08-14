import React from 'react'
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';



const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const EditCareers = () => {
  return (
    <div className='fixed bg-black bg-opacity-30 items-center justify-center flex inset-0'>
      <div className='bg-white p-5 rounded-md'>
        <div className='font-bold text-xl text-costume-primary-color mb-3'>CAREER DETAILS</div>
        <hr className='border-2 border-sky-600' />
        <div>

        </div>
      </div>
    </div>
  )
}

export default EditCareers