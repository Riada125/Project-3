const User = require('../models/User')
const Restaurant = require('../models/Restaurant')

function index(req, res) {
  Restaurant
    .find()
    .populate('user')
    .then(restaurants => res.status(200).json(restaurants))
    .catch(err => console.log(err))
}

function show(req, res) {
  Restaurant
    .findById(req.params.id)
    .then(restaurant => {
      if (!restaurant) res.status(404).json({ message: '404 Not found' })
      else res.status(200).json(restaurant)
    })
    .catch(err => console.log(err))
}

module.exports = {
  index,
  show
}