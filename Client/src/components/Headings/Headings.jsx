import React from 'react'
import './heading.css'
const Headings = ({heading}) => {
  return (
    <div className='container-fluid head-div bg-blue text-center py-3'>
        <h2 className='heading-tag'>{heading}</h2>
    </div>
  )
}

export default Headings