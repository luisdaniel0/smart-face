import './App.css'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FacialRecognition from './components/FacialRecognition/FacialRecognition'
import Signin from './components/SignIn/Signin'
import Register from './components/Register/Register'


const App = () => {

  const [imageURL, setImageURL] = useState('')
  const [showImage, setShowImage] = useState(false); // keep track whether user has clicked detect button or not
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedin, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''

  })

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }
  
  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = image.width
    const height = image.height
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box)
  }

  const handleAPI = () => {
    const PAT = 'e198bbcd48cc4618a986e07fd515a950';
    const USER_ID = 'luisdanielai';
    const APP_ID = 'test';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105'
    const IMAGE_URL = imageURL


    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => displayFaceBox(calculateFaceLocation(result)))
      .catch(error => console.log('errorrrrr', error));
    setShowImage(true); // show the image when detect button is clicked
    
    
  };

  const handleInputChange = (e) => {
    setImageURL(e.target.value);
    setShowImage(false); //resets the image state when input changes
    
    
  }


  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false)
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route)
  }
  

  return (
    <>
      <Navigation isSignedin={isSignedin} onRouteChange={onRouteChange} />
      {route === 'home' ?  
        <>
          <Logo />
          <Rank />
          <ImageLinkForm handleInputChange={handleInputChange} handleAPI={handleAPI} />
          <FacialRecognition box={box} imageURL={imageURL} showImage={showImage} />
        </>
        : (
          route === 'signin' 
            ? <Signin onRouteChange={onRouteChange} />
            : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )
      }</>
        
    )
  
}

export default App
