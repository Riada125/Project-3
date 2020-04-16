const router = require('express').Router()
const recipes = require('./controllers/recipes')
const restaurants = require('./controllers/restaurants')
const users = require('./controllers/users')
const secureRoute = require('./lib/secureRoute')

// Reggie: Weekend Work

router.route('/recipes')
  .get(recipes.index)
  .post(secureRoute, recipes.createRecipe)


router.route('/recipes/:id')
  .get(recipes.show)
  .put(secureRoute, recipes.updateRecipe)
  .delete(secureRoute, recipes.removeRecipe)
  .post(secureRoute, recipes.createComment)


router.route('/recipes/:id/comments/:commentId')
  .delete(secureRoute, recipes.deleteComment)

router.route('/restaurants')
  .get(restaurants.index)

router.route('/restaurants/:id')
  .get(restaurants.show)

router.route('/profile')
  .get(secureRoute, users.show)

router.route('/profile/edit')
  .put(secureRoute, users.edit)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router


