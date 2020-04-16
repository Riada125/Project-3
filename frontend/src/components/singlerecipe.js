import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import emailjs from 'emailjs-com'
import { UserContext, ReciContext } from './UserContext'
import CommentCard from './CommentCard'
import Auth from '../lib/auth'
import Fade from 'react-reveal/Bounce'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
  autoClose: false
})

const SingleRecipe = (props) => {
  const [data, setData] = useState({ ingredients: [], method: [], comments: [] })
  const [info, setInfo] = useState({})
  const [added, setAdded] = useState(false)

  const { userInfo, setUserInfo } = useContext(UserContext)
  const { reci, setReci } = useContext(ReciContext)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const id = props.match.params.id
    axios.get(`/api/recipes/${id}`)
      .then(res => {
        const newData = res.data
        setData(newData)
        setReci(newData)
        if (userInfo) {
          setInfo(userInfo)
          const alreadyAdded = userInfo.favouriteRecipes.some((recipe) => {
            return recipe._id === newData._id
          })
          setAdded(alreadyAdded)
        }
      })
      .catch(err => console.log(err))
  }, [userInfo])


  const notify = () => toast(`Your shopping list has been sent to ${userInfo.email}!`)



  const shoppingList = data.ingredients.map(function (ingredient) {
    return '<li>' + ingredient + '</li>'
  }).join('')


  const handleSubmit = () => {
    if (userInfo) {
      const templateParams = {
        email_to: userInfo.email,
        to_name: userInfo.username,
        author_name: data.author,
        recipe_name: data.name,
        message_html: shoppingList
      }

      emailjs.send('gmail', 'template_WaFbUNl4', templateParams, 'user_phelnwXOqjMmZRbyROmsu')
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        notify(),
        function (error) {
          console.log('FAILED...', error)
        })
    }
  }

  const favourite = (props) => {
    const update = info.favouriteRecipes
    update.push(data)
    setInfo({ ...info, favouriteRecipes: update })
    axios.put('/api/profile/edit', info, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        setUserInfo(res.data.user)
      })
      .catch(err => {
        console.log(err)
        props.history.push('/login')
      })
  }


  const postIt = () => {
    axios.post(`/api/recipes/${data._id}`, formData,
      {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => {
        setReci(res.data)
        setFormData({ ...formData, text: '' })
        // props.history.push(`/recipes/${data._id}`)
      })
      .catch(err => {
        setErrors(err.response.data.errors)
        console.log(err.response.data.errors)
      })
  }


  // moment(data.comments.timestamp)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(data.user)
    setErrors({})
  }

  const postComment = (e) => {
    e.preventDefault()
    postIt()
    setFormData({ ...formData, text: '' })
  }


  const handleDelete = (e) => {
    const id = props.match.params.id
    axios.delete(`/api/recipes/${id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => props.history.push('/recipes'))
      .catch(err => console.log(err))
  }



  const isOwner = function () {
    return Auth.getUserId() === data.user

  }

  const userProfilePic = userInfo ? userInfo.image : 'https://www.pngfind.com/pngs/m/63-637582_cooking-icon-png-chef-logo-silhouette-png-transparent.png'

  return <div className="section" id="single-recipe-page" style={{ marginTop: 50  }}>
    <div className="container">
      <p className="title is-size-2-mobile">
        {data.name}
      </p>
      <br />
      <p className="subtitle is-size-2 is-size-3-mobile">
              by {data.author}
      </p>
      <Fade right>
        {/* <div className="box is-size-6-mobile is-size-5 is-size-7-tablet desktop-only" id="inner-border" style={{ width: 1350, height: 780 }}> */}
        <div className="section" style={{ width: 1000 }}>
          <div className="container is-size-6">
            <div className="columns">
              <div className="column is-half is-size-7-mobile">
                <ul>
                  {data.ingredients.map((ingredient, id) =>
                    <li key={id} style={{ fontWeight: 700 }}>{ingredient}</li>
                  )}
                </ul>
                <ol>
                  {data.method.map((ingredient, id) =>
                    <li key={id}>{ingredient}</li>
                  )}
                </ol>
                <br />
                {userInfo ? <button className="button is-black" onClick={(e) => handleSubmit(e)}>
                Email me the Shopping List!
                </button>
                  :
                  <button className="button is-black">
               Sign in to email yourself these ingredients
                  </button>
                }
              </div>
              <div className="column is-half is-half-mobile">
                <img id="single" className="image is-5by4" src={data.image} />
                <br />
                {isOwner() &&
                  <>
                    <button className="button is-black" onClick={(e) => handleDelete(e)}>
                      {'Remove this recipe'}
                    </button>
                  </>
                }
                <br />
              </div>
            </div>
          </div>
        </div>
      </Fade>
      <br />
      {added ? <button className="button is-light" title="Disabled button" disabled>Added</button> : userInfo && info.username && <button className="button is-black" onClick={favourite} style={{ marginBottom: 20 }}>Save to Profile</button>} 
      <br />
      {reci && reci.comments.map((comments, i) => {
        return <CommentCard key={i} comments={comments} recipeInfo={data} setRecipeInfo={setData} isOwner={isOwner} props={props} />
      })}
      {userInfo ?
            <>
            <br />
            <form className="form" onSubmit={postComment}>
              <article className="media">
                <figure className="media-left">
                  <p className="image is-64x64">
                    <img src={userProfilePic ? userProfilePic : 'https://www.pngfind.com/pngs/m/63-637582_cooking-icon-png-chef-logo-silhouette-png-transparent.png'} />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="field">
                    <p className="control">
                      <textarea onChange={handleChange} name="text" className="textarea" placeholder="Add a comment..." value={formData.text}></textarea>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button className="button" style={{ marginBottom: 20 }}>Post comment</button>
                    </p>
                  </div>
                </div>
              </article>
            </form>
          </>
        : <>
            <br />
            <br />
            <h1>You must be signed in to post a comment!</h1>
          </>}
    </div>
  </div>
}

export default SingleRecipe