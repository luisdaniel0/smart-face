import React, { useState } from 'react'


const Signin = ({ onRouteChange }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const onPasswordChnge = (e) => {
    setPassword(e.target.value)
  }

  const onSubmitSignin = () => {
    fetch("http://localhost:3000/signin", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'success!') {
          onRouteChange('home')
      }
    })
    
  }
  
  return (
 <>
  <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

    <main className="pa4 black-80">
      <div className="measure ">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange} />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChnge} />
          </div>
          
        </fieldset> 
        <div className="" onClick={onSubmitSignin}>
          <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
        </div>
        <p onClick={()=>onRouteChange('register')} className="lh-copy mt3 pointer">
          <a href="#0" className="f6 link dim black db">Register</a>
          
        </p>
      </div>
          </main>
  </article>
</>
  )
}

export default Signin