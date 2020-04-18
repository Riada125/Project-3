import React, { useState, useContext } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import { UserContext } from './UserContext'
import Background from '../images/bg2.png'

const sectionStyle = {
  backgroundImage: 'url(' + { Background } + ')'
}


const Login = (props) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState('')

  const { setUserInfo } = useContext(UserContext)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({ errors: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', data)
      .then(response => {
        Auth.setToken(response.data.token)
        setUserInfo(response.data.user)
        props.history.push('/recipes')
      })

      .catch(() => setErrors({ message: 'Incorrect credentials' }))
  }


  return <section className="section has-text-centered is-full-height" id="loginPage" style={{ sectionStyle }}>
    <div className="container has-text-centered" id="newform">
      <div className="title is-size-1 title has-text-white">Login</div>
      <form className="form has-text-centered" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Email
          </label>
          <div className="control">
            <input
              onChange={handleChange}
              type="text"
              name="email"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Password
          </label>
          <div className="control">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              className="input"
            />
          </div>
          {errors.message && <small className="help is-danger">
            {errors.message}
          </small>}
        </div>
        <button className="button is-black" style={{ border: '1px solid white' }}>
          Login
        </button>
      </form>
    </div>
  </section>
}
export default Login