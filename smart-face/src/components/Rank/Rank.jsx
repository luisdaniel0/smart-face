import React from 'react'

const Rank = ({name,entries}) => {
  return (
    <>
      <div className='center white f3'>
        {`${name}, your current entries..`}
      </div>
      <div className='center white f1'>
        {`${entries}`}
      </div>
    
    </>
  )
}

export default Rank