const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(200).json({ message: `Hi ${user.username}! Let's change the way you do food..` })) // evaluate if welcome message set up correctly
    .catch(next)
}


function login(req, res) {
  User
    .findOne({ email: req.body.email }) 
    .then(user => { 
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' }) 
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '2h' }) 

      res.status(202).json({ message: `Welcome Back ${user.username}`, user, token })
    }) 
    .catch(() => res.status(401).json({ message: 'Unauthorized' }))
}

function show(req, res) {
  User
    .findById(req.currentUser)
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'There\'s a problem with this user...' })
      }
      res.status(200).json({ user })
    })
    .catch(() => {
      res.status(401).json({ message: 'Profile Not Found' })
    })
}


function edit(req, res) {
  User
    .findById(req.currentUser)
    .then(user => {
      if (!user) return res.status(401).json({ message: 'There\'s a problem with this user...' })
      return user.set(req.body)
    })
    .then(user => user.save())
    .then(user => res.status(202).json({ user }))
    .catch(() => res.status(401).json({ message: 'Profile Not Found' }))
}

module.exports = {
  register,
  login,
  show,
  edit
}