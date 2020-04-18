import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/auth'

import { UserContext } from './UserContext'


const Profile = () => {
  const [data, setData] = useState({})
  const [info, setInfo] = useState({})
  const [update, setUpdate] = useState(false)

  const { userInfo, setUserInfo } = useContext(UserContext)


  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        const newData = res.data
        setData(newData)
        if (userInfo) {
          setInfo(userInfo)
        }
      })
      .catch(error => console.log(error))
  }, [userInfo])

  useEffect(() => {
    if (update) {
      axios.put('/api/profile/edit', info, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(res => {
          setUserInfo(res.data.user)
          setUpdate(false)
        })
        .catch(err => console.log(err))
    }
  }, [info])


  const removeFavRest = (e) => {
    const match = info.favouriteRestaurants
    const update = match.filter((rest) => {
      return rest.name !== e.target.attributes.getNamedItem('data-name').value
    })
    console.log(update)
    setInfo({ ...info, favouriteRestaurants: update })
    setUpdate(true)
  }

  const removeFavReci = (e) => {
    const match = info.favouriteRecipes
    const update = match.filter((reci) => {
      return reci.name !== e.target.attributes.getNamedItem('data-name').value
    })
    console.log(update)
    setInfo({ ...info, favouriteRecipes: update })
    setUpdate(true)
  }


  return (
    <div className="section">
      <div className="container">
        {data.user && <h1>
          Welcome to The Kitchen, {data.user.username}!
        </h1>}
        {data.user && <h2>
          {data.user.email}
        </h2>}
        <div className="subtitle">
          {data.user && data.user.dietary.map((diet, id) =>
            <p key={id}>{diet}</p>
          )}
        </div>
        <div>
          <h3>Quicklinks</h3>
          <Link className="tag is-info is-light" to='/profile/edit'>Edit Profile</Link>
          <Link className="tag is-info is-light" to='/recipes'>Recipes</Link>
          <Link className="tag is-info is-light" to='/restaurants'>Restaurants</Link>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="titlecontain">
            <h2 className="headers">Your Favourite Restaurants...</h2>
          </div>
          <div className="columns is-multiline">
            {data.user && data.user.favouriteRestaurants.map((rest, id) => {
              return (
                <div key={id} className="column is-one-quarter-desktop is-one-third-tablet is-three-quartes-mobile">
                  <div className="card">
                    <h3 className="fav-title card-header-title is-centered"><Link className='fav-link' to={`/restaurants/${rest._id}`}>{rest.name}</Link></h3>
                    <p className="fav-sub">{rest.location}</p>
                    <div className="card-image">
                      <figure className="image is-5by4 is-centered">
                        <img className="image" src={rest.image[0]} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="card-footer">

                        <br />
                        <Link data-name={rest.name} onClick={removeFavRest} className="card-footer-item">Remove</Link>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="titlecontain">
              <h2 className="headers">Your Favourite Recipes...</h2>
            </div>
            <div className="columns is-multiline">
              {data.user && data.user.favouriteRecipes.map((recipes, id) => {
                return (
                  <div key={id} className="column is-one-quarter-desktop is-one-third-tablet is-three-quartes-mobile">
                    <div className="card">
                      <h3 className="fav-title-recipe card-header-title is-centered"><Link className='fav-title-recipe' to={`/recipes/${recipes._id}`}>{recipes.name}</Link></h3>
                      <p className="fav-sub">by {recipes.author}</p>
                      <div className="card-image">
                        <figure className="image is-5by4">
                          <img className="image" src={recipes.image[0]} />
                        </figure>
                      </div>
                      <div className="card-content">
                        <div className="card-footer">
                          <Link data-name={recipes.name} onClick={removeFavReci} className="card-footer-item">Remove</Link>
                        </div>
                      </div>
                    </div>
                  </div>)
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Profile