const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Restaurant = require('../models/Restaurant')
const Recipe = require('../models/Recipe')
const User = require('../models/User')
const restaurantSeed = require('./allseeds/restaurantSeeds')
const recipeSeed = require('./allseeds/recipeSeeds')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, db) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return User.create([{
          username: 'Admin',
          email: 'admin@email',
          password: 'admin',
          passwordConfirmation: 'admin'
        }])
      })
      .then(users => {
        console.log(`${'🍷'.repeat(users.length)} users created`)
        return Recipe.create(recipeSeed(users[0]))
      })
      .then(recipes => console.log(`${recipes.length} recipes created`))
      .catch(err => console.log(err))
      .then(() => {
        return User.find({
          username: 'Admin'
        })
      })
      .then(user => {
        console.log(`${user[0].username} found`)
        return Restaurant.create(restaurantSeed(user[0]))
      })
      .then(restaurant => {
        console.log(`${restaurant.length} restaurants created`)
      })
      .finally(() => mongoose.connection.close())
  }
)