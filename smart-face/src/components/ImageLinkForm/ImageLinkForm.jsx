import React from 'react'
import "./ImageLinkForm.css"

const ImageLinkForm = ({ handleInputChange, handleAPI, isLoading }) => {


  return (
    <div>
      <p className='f3 center white'>
        {`This Magic Brain will detect faces in your pictures, give it a try! Enter a Link below`}
      </p>
      <p className='f3 center white'>
        {'Click the button to detect a face in your image!'}
      </p>

      <div
        className='center'>
        <div
          className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type='text'
            onChange={handleInputChange} />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={ handleAPI}>
            Detect
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default ImageLinkForm