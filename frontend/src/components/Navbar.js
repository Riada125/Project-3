import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../lib/auth'
import { UserContext } from './UserContext'

const Navbar = () => {


  const { userInfo } = useContext(UserContext)


  const handleMenu = () => {
    const burger = document.querySelector('.burger')
    const menuList = document.querySelector('#' + burger.dataset.target)

    burger.classList.toggle('is-active')
    menuList.classList.toggle('is-active')
  }

  return <nav className="navbar is-black is-fixed-top">
    <div className="navbar-brand">
      <Link id="homeicon" className="navbar-item" to="/">the kitchen</Link>
      <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navDrop" onClick={handleMenu}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navDrop" className="navbar-menu">
      <div className="navbar-end">
        <div className="navbar-item has-dropdown is-hoverable">
          <Link className="navbar-link is-arrowless" to="/restaurants">
            Restaurants
          </Link>
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <Link className="navbar-link is-arrowless" to="/recipes">
            Recipes
          </Link>
        </div>
        {Auth.isAuthorized() &&
          <div className="navbar-item has-dropdown is-hoverable">
            <Link className="navbar-link is-arrowless" to="/recipe/new">
              Add a Recipe
            </Link>
          </div>}
        <div className="navbar-item has-dropdown is-hoverable">
          {userInfo ? <Link className="navbar-link is-arrowless" id="profile" to="/profile">{userInfo.username}</Link> : <div className="navbar-item is-arrowless" >Profile</div>}
          <div className="navbar-dropdown is-boxed">
            {!userInfo && <Link className="navbar-item" id="register" to="/register">
              Register
            </Link>}
            {!userInfo && <Link className="navbar-item" id="login" to="/login">
              Login
            </Link>}
            {userInfo && <Link className="navbar-item" id="logout" to="/logout">
              Logout
            </Link>}
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar

