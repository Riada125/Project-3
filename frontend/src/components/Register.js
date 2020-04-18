import React, { useState } from 'react'
import axios from 'axios'
import Background from '../images/bg2.png'

const sectionStyle = {
  backgroundImage: 'url(' + { Background } + ')'
}

const Register = (props) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})


  const postIt = () => {

    axios.post('/api/register', data)
      .then(() => props.history.push('/login'))
      .catch(err => {
        setErrors(err.response.data.errors)
        console.log(err.response.data.errors)
      })
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({})
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    postIt()
  }

  return <div className="section has-text-centered is-full-height" id="loginPage" style={{ sectionStyle }}>
    <div className="container has-text-centered" id="newform">
      <div className="title is-size-1 title has-text-white">Register</div>
      <form className="form has-text-centered" onSubmit={handleSubmit}>
        <div className='field'>
          <div className='control'>
            <label htmlFor='' className="label has-text-white">
              Full Name
              <input onChange={handleChange} className='input is-info' type='text' name='username' />
            </label>
          </div>
          {errors.username && <small className="help is-danger">
            {errors.username}
          </small>}
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor='' className="label has-text-white">
              E-mail
              <input onChange={handleChange} className='input is-info' type='text' name='email' />
            </label>
          </div>
          {errors.email && <small className="help is-danger">
            {errors.email}
          </small>}
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor='' className="label has-text-white">
              Link to Profile Picture
              <input onChange={handleChange} className='input is-info' type='text' name='image' value={data.image ? data.image : ''} />
            </label>
          </div>
          {errors.image && <small className="help is-danger">
            {errors.image}
          </small>}
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor='' className="label has-text-white">
              Password
              <input onChange={handleChange} className='input is-info' type='password' name='password' />
            </label>
          </div>
          {errors.password && <small className="help is-danger">
            {errors.password}
          </small>}
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor='' className="label has-text-white">
              Confirm Password
              <input onChange={handleChange} className='input is-info' type='password' name='passwordConfirmation' />
            </label>
          </div>
          {errors.passwordConfirmation && <small className="help is-danger">
            {errors.passwordConfirmation}
          </small>}
        </div>
        <button className="button is-black" style={{ border: '1px solid white' }}>
          Register
        </button>
      </form>
    </div>
  </div>
}

export default Register