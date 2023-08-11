import React from 'react'
import Tilt from 'react-parallax-tilt';
import brain from "./brain.png"
import "./Logo.css";

const Logo = () => {
  
  return (
    <>
      <Tilt className='tilt' tiltReverse={true} style={{ height: '100px',width:'100px' }}>
        <img style={{paddingLeft: '30px', paddingTop: '20px'}} alt='logo' src={brain}></img>
    </Tilt>
    </>
  )
}

export default Logo