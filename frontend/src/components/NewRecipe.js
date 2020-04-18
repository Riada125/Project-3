import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/auth'


const Register = (props) => {
  const [data, setData] = useState({
    ingredients: [''],
    method: [''],
    category: ['']
  })
  const [errors, setErrors] = useState({})


  const postIt = () => {
    axios.post('/api/recipes', data,
      {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        props.history.push(`/recipes/${res.data._id}`)
      })
      .catch(err => {
        setErrors(err.response.data.errors)
        console.log(err.response.data.errors)
      })
  }


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
    setErrors({})
  }
  
  const handleMultiChange = (e, i) => {
    data[e.target.name][i] = e.target.value
    setData({ ...data, [e.target.name]: data[e.target.name] }) 
    console.log(data)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postIt()
  }
  
  const addItem = () => {
    setData({ ...data, ingredients: [...data.ingredients, '' ] })
  }
	
  const addStep = () => {
    setData({ ...data, method: [...data.method, '' ] })
  }
  
  const addCat = () => {
    setData({ ...data, category: [...data.category, '' ] })
  }

  return <div className="section has-text-centered is-full-height" id="newRecipe">
    <div className="container has-text-centered" id="newform">
      <div className="title is-size-1 title has-text-white">Add a new Recipe</div>
      <form className="form has-text-centered" onSubmit={handleSubmit}>
        <div className='field'>
          <div className='control'>
            <label htmlFor='' className="label has-text-white">
              What&apos;s it called?
              <input onChange={handleChange} className='input is-info' type='text' name='name' />
            </label>
          </div>
          {errors.name && <small className="help is-danger">
            {errors.name}
          </small>}
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor='' className="label has-text-white">
              Who created it?
              <input onChange={handleChange} className='input is-info' type='text' name='author' />
            </label>
          </div>
          {errors.author && <small className="help is-danger">
            {errors.author}
          </small>}
        </div>
        <div className='field'>
          <div className='control'>
            <label htmlFor='' className="label has-text-white">
              What&apos;s the story behind this dish?
              <input onChange={handleChange} className='input is-info' type='text' name='about' />
            </label>
          </div>
          {errors.method && <small className="help is-danger">
            {errors.method}
          </small>}
        </div>

        {data.ingredients.map((ingredient, i) => {
          return (
            <div key={i} className='field'>
              <div className='control'>
                <label htmlFor='' className="label has-text-white">
                  Add ingredient {i + 1}
                  <input onChange={(e) => handleMultiChange(e,i)} className='input is-info' type='text' name={'ingredients'} />
                </label>
              </div>
              {errors.ingredients && <small className="help is-danger">
                {errors.ingredients}
              </small>}
            </div>
          )
        })}
        <button type="button" onClick={() => addItem()} >
          Add another ingredient
        </button>
        {data &&
          data.method.map((step, i) => {
            return (
              <div key={i} className='field'>
                <div className='control'>
                  <label htmlFor='' className="label has-text-white">
                    Add step {i + 1}
                    <input onChange={(e) => handleMultiChange(e,i)} className='input is-info' type='text' name={'method'} />
                  </label>
                </div>
                {errors.method && <small className="help is-danger">
                  {errors.method}
                </small>}
              </div>
            )
          })}
        <button type="button" onClick={() => addStep()} >
          Add another step
        </button>

        {data &&
          data.category.map((cat, i) => {
            return (
              <div key={i} className='field'>
                <div className='control'>
                  <label htmlFor=''>
                    Add a category (e.g &lsquo;Vegetarian&rsquo;, &lsquo;Comfort-food&rsquo;)
                    <input onChange={(e) => handleMultiChange(e,i)} className='input is-info' type='text' name={'category'} />
                  </label>
                </div>
                {errors.category && <small className="help is-danger">
                  {errors.category}
                </small>}
              </div>
            )
          })}
        <button type="button" onClick={() => addCat()} >
          Add another category
        </button>
        <div className='field'>
          <div className='control'>
            <label htmlFor='' className="label has-text-white">
              Add a link to a picture of it
              <input onChange={handleChange} className='input is-info' type='text' name='image' value={data.image ? data.image : ''} />
            </label>
          </div>
          {errors.image && <small className="help is-danger">
            {errors.image}
          </small>}
        </div>
        <button className="button is-black" style={{ border: '1px solid white' }}>
          Submit Recipe!
        </button>
      </form>
    </div>
  </div >
}

export default Register