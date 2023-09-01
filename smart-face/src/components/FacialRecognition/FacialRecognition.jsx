import React from 'react'
import './FacialRecognition.css'

const FacialRecognition = ({ imageURL, showImage, box }) => {

  const isFormEmpty = () => {
    if (imageURL.length <= 30) {
      return {display:'none'}
    }
  }
  return (
  <>
    <div className='faceRecognition center'>
      <div className='center ma'>
          <div className='absolute mt2'>
          {imageURL.length >30 && (
              <img
                id="inputImage"
                alt="img"
                src={imageURL}
                width="500px"
                height="auto"
              />
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