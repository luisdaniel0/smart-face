import React from 'react'
import './FacialRecognition.css'

const FacialRecognition = ({ imageURL, showImage }) => {

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        {showImage && (
          <img className='imgLink' alt='img' src={imageURL} />
          )}
      </div>
    </div>
  )
}

export default FacialRecognition