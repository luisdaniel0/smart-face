import React from 'react'
import './FacialRecognition.css'

const FacialRecognition = ({ imageURL, showImage, box }) => {

  return (
  <>
    <div className='faceRecognition center'>
      <div className='center ma'>
        <div className='absolute mt2'>
          {showImage && (
              <img id='inputimage'
                alt='img'
                src={imageURL}
                width='500px'
                height='auto'/>
          )} 
          
          <div className='bounding-box' style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
            }}> 
          </div>
        </div>
        </div>
      </div>
  </>
  )
}

export default FacialRecognition