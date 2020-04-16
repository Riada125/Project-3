import React, { useState, useContext } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'
import { UserContext } from './UserContext'
import Background from '../images/bg2.png'

//Reggie: Weekend Work
//Reggie: This page had some slight changes to make with regards to the syntax for state on the page. The initial state had to be initialised to
// specific values so that the code would stay intact. Errors at the foot of the form reference the message for incorrect details.

/* I'd been investigating the passing of information throughout the weekend. My main focus has been to tighten up the logged on user and logged off
user logic. The key thing that informed this investigation was the need to display items based on authentication without blocking off those same
routes to users that hadn't logged in.

Eventually, an elegant solution has been found with the introduction of a new hook. This method is quick and concise, gets around directional passing
of state and updates and allows on page conditionals to be nicely rendered, however it can be broken by page refreshes. */

const sectionStyle = {
  backgroundImage: 'url(' + { Background } + ')'
}


const Login = (props) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState('')

  /* This following line is the first intro of the useContext hook. In essence it allows for us to share info across the whole code plain.
  It's first wrapped around all the components that will need the data and then it is referenced in each by declaring the variable linked to 
  state at the parent level. */
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