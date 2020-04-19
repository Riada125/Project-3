### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# <span style="font-family:Courier New">The Kitchen </span>🍴
by [Michael Adair](https://github.com/mjadair), [Marissa Epstein](https://github.com/marepstein) and [Reggie Tachie-Menson](https://github.com/reggiemenson)

## <span style="font-family:Courier New">Overview </span>

The Kitchen is a full-stack app that includes a RESTful API built with Express, MonogoDB and NodeJS and a React Front-end. 

The concept was to build an app that asked users if they wanted to dine-in or eat-out and then provide them with options based on their decision. 

The dine-in portion of the website allows users to search recipes from our database, it also allows logged in users to add their own recipes, much like a virtual recipe book and the user can also have shopping lists for each recipe emailed to their registered email address.

The eat-out section gives users details about London restaurants from our own seeded database. 

Users also have a profile page which displays their favourite recipes and restaurants. 

## <span style="font-family:Courier New"> Table of Contents </span>
1. [The Brief](#Brief)
2. [Technologies used](#Tech)
3. [Approach](#Approach)
    - [Planning](#planning)
    - [Back-end](#back)
    - [Front-end](#front)
4. [Potential future features](#future)
5. [Lessons learned](#lessons)


## <span style="font-family:Courier New" id="Brief">The Brief</span>

* Work in a team, using **git to code collaboratively**.
* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models

## <span style="font-family:Courier New" id="Tech">Technologies Used </span>
- HTML5
- CSS3
- JavaScript (ES6)
- React.js
- Express
- Mongo and Mongoose
- React Toastify
- Git and GitHub
- Bulma
- Google Fonts

## <span style="font-family:Courier New" id="Approach">Approach </span>

### <span style="font-family:Courier New" id="planning">Planning</span>

### <span style="font-family:Courier New" id="back">Back-End</span>

**<ins>Models</ins>**

We specified four models which utilise a Mongoose Schema class. 

A user:

```js
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  image: { type: String },
  dietary: { type: [String] },
  favouriteRestaurants: { type: [Object] },
  favouriteRecipes: { type: [Object] }
}
```

A restaurant:

```js
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  image: { type: [String], required: true },
  category: { type: [String], required: true },
  cuisine: { type: String },
  type: { type: [String] },
  dietary: { type: [String] },
  postcode: { type: [String], required: true },
  priceRange: { type: String, required: true },
  link: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
}, {
  timestamps: true
})
```

and a Recipe:

```js
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  about: { type: String },
  ingredients: { type: [String], required: true },
  method: { type: [String], required: true },
  image: { type: [String], required: true },
  category: { type: [String], required: true },
  cuisine: { type: String },
  type: { type: [String], required: true },
  dietary: { type: [String] },
  serves: { type: String },
  complexity: { type: [String] },
  time: { type: String  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [ commentSchema ] 
}, {
  timestamps: true
})
```

Logged in users can also comment on Recipes and so we also have a comment Schema:

```js
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})
```

**<ins>API End-points</ins>**

1. User

  |           	| GET 	| POST 	| PUT 	| DELETE 	|
  |-----------	|-----	|------	|-----	|--------	|
  | /register 	|     	|   x  	|     	|        	|
  | /login    	|     	|   x  	|     	|        	|
  | /profile   	|  x  	|     	|    	|       
  | /profile/edit  	|    	|     	|  x  	|      	|


- `/register` has a post route, where the new user's data is received and stored in the database.

```js
function register(req, res, next) {
  User
    .create(req.body)
    .then(user => res.status(200).json({ message: `Hi ${user.username}! Let's change the way you do food..` })) 
    .catch(next)
}
```


- `/login` also has a single post route. When a valid user's login information is received a JSON Web token is returned and saved to localStorage.

```js
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
```

2. Restaurants

  |                      	| GET 	| POST 	| PUT 	| DELETE 	|
  |----------------------	|-----	|------	|-----	|--------	|
  | /restaurants           	|  x  	|     	|     	|        	|
  | /restaurant/:id 	|  x  	|      	|     	|        	|


- Restaurants simply has two `/get` end-points. For users to view all or individual restaurants from our existing database. 


3. Recipes

 |                      	| GET 	| POST 	| PUT 	| DELETE 	|
  |----------------------	|-----	|------	|-----	|--------	|
  | /recipes           	|  x  	|   x  	|     	|        	|
  | /recipes/:id 	|  x  	|  x    	|   x  	|    x    	|
  /recipes/:id/comments/:commentId          	|    	|    	|     	|     x   	|
    
- Any user can `/get` all recipes and individual recipes:

```js
function index(req, res) {
  Recipe
    .find()
    .populate('user')
    .populate('comments.user')
    .then(recipes => res.status(200).json(recipes))
    .catch(err => console.log(err))
}

function show(req, res) {
  Recipe
    .findById(req.params.id)
    .populate('comments.user')
    .then(recipe => {
      console.log('My recipe is', recipe.name)
      if (!recipe) res.status(404).json({ message: '404 Not found' })
      else res.status(200).json(recipe)
    })
    .catch(err => console.log(err))
}
```

- A registered, logged-in user can also `/post` recipes as well as `/put` and `/delete` any recipes that they have posted.

The below functions all pass through a secure route to ensure that the user is logged in and the latter two functions ensure that the user making the request matches the user who created the recipe. Users cannot see these options on the front-end if unless they are authorised. 

```js
function createRecipe(req, res) {
  req.body.user = req.currentUser
  Recipe
    .create(req.body)
    .then(recipe => res.status(201).json(recipe))
    .catch(err => console.log(err))
}


function updateRecipe(req, res) {
  Recipe
    .findById(req.params.id)
    .then(recipe => {
      if (!recipe) return res.status(404).json({ message: '404 Not found' })
      if (!req.currentUser._id.equals(recipe.user)) return res.status(401).json({ message: 'Unauthorized' })
      return recipe.set(req.body)
    })
    .then(recipe => recipe.save())
    .then(recipe => res.status(202).json(recipe))
}


function removeRecipe(req, res) {
  Recipe
    .findById(req.params.id)
    .then(recipe => {
      if (!recipe) return res.status(404).json({ message: 'Not Found' })
      if (!req.currentUser._id.equals(recipe.user)) return res.status(401).json({ message: 'Unauthorized' })
      return recipe.remove()
    })
    .then(() => res.status(200).json({ message: 'Recipe deleted' }))
    .catch(err => console.log(err))
}
```

Users can also comment on recipes and delete their own comments. These functions are similar to those shown above. 



**<ins>Secure Route</ins>**

A number of the API Endpoints need to pass through a secure route to ensure that the user is authorised. An example of how this looks in the router is below:

```js
router.route('/recipes/:id')
  .get(recipes.show)
  .put(secureRoute, recipes.updateRecipe)
  .delete(secureRoute, recipes.removeRecipe)
  .post(secureRoute, recipes.createComment)
```
As you can see, any one can see an individual recipe, but only authorised users can reach the end points that follow the secure route. 

We use JSON Web Token for this. When a user logs in, they are assigned a token:

```js
 const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '2h' }) 
 res.status(202).json({ message: `Welcome Back ${user.username}`, user, token })

```
When the token is received by our front-end, it is saved to local storage:

```js
  static setToken(token) {
    localStorage.setItem('token', token)
  }
```

And we get the token and include it in the header of any of our requests to the API:

```js
  static getToken() {
    return localStorage.getItem('token')
  }
```

Below is how the SecureRoute is setup:

```js
function secureRoute(req, res, next) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) { 
    return res.status(401).json({ message: 'Unauthorized' })
  }
	
  const token = req.headers.authorization.replace('Bearer ', '') 
	
  jwt.verify(token, secret, (err, payload) => { 
    if (err) return res.status(401).json({ message: 'Unauthorized' }) 
    User 
      .findById(payload.sub) 
      .then(user => {
        if (!user) return res.status(401).json({ message: 'Unauthorized' }) 
        req.currentUser = user
        next() 
      })
      .catch(() => res.status(401).json({ message: 'Unauthorized' }))
  })
}
```

The verification process takes the payload.sub from the User's token and finds the related user. If it exists, it sets the `req.currentUser` to the user making the request, we can then use this in the subsequent endpoints to determine if the user making the request is the same as the user who created the recipe. 
 



### <span style="font-family:Courier New" id="front"><ins>Front-End</ins></span>


<img  src=Screenshots/HomeDesktop.png width=500> <img  src=Screenshots/HomeMobile.png height=250> 



**<ins>Hooks</ins>**

This was the first project in which we used React's new Hooks feature. Instead of writing class components, we opted to use the `useState` hook, with `useEffect` in place of `componentDidMount` and `useContext` to share state between components without having to pass props or make repeated calls to our back-end API. 


The `useState` hook is used throughout the project. One example of its use is on the registration page:

```js
 const [data, setData] = useState({})
 
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setErrors({})
  }
  
    const postIt = () => {

    axios.post('/api/register', data)
      .then(() => props.history.push('/login'))
      .catch(err => {
        setErrors(err.response.data.errors)
        console.log(err.response.data.errors)
      })
  }
```
 
Above, `useState({})` is setting `data` as an empty object. The handle change function uses `setData` to update the `data` object variable and thus we can then use this data as state in our post to the API.


`useContext` was another helpful Hook for this project. We utilised it to hold the information of the logged-in user across the app so that we didn't have to make repeated calls to the API or pass props through all of our components. 

We have a file called `userContext.js` that creates a context and sets it to a null value:

```js
import { createContext } from 'react'

export const UserContext = createContext(null)
```



We then update the context upon the user's login:

```js

const { setUserInfo } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', data)
      .then(response => {
        Auth.setToken(response.data.token)
        setUserInfo(response.data.user)
        props.history.push('/recipes')
      })

```

 Once a user has successfully logged in, we `setUserInfo` to be the response from the API (the details of the logged in user such as their name, id, profile picture and favourite recipes and restaurants).

With this information saved by `useContext`, the entire app can access it as state without props being passed or with us requiring more calls to the API. 

This is used to our advantage in places like the navbar, where the user's profile name is rendered from `userInfo`.

Another place this is used to our advantage is when a logged-in user navigates to a single recipe page:

```js
        if (userInfo) {
          setInfo(userInfo)
          const alreadyAdded = userInfo.favouriteRecipes.some((recipe) => {
            return recipe._id === newData._id
          })
          setAdded(alreadyAdded)
        }
```

The snipped above is when we return a single recipe from our API. We check the userInfo from `useContext`, if the user has already favourited the recipe, they will be unable to do so again. It was really pleasing for us to achieve this without having to continuously pass the user as a prop throughout all of our components or make repeated calls to the API to check the state of the user's favourites. 


**<ins>Filtering</ins>**

One of the biggest challenges we faced on this project was filtering our recipes using multiple filters.

 
<img  src=Screenshots/FilteredRecipes1.png width=500> <img  src=Screenshots/FilteredRecipes2.png width=500> 








## <span style="font-family:Courier New" id="challenges">Challenges </span>

*Coming soon*

## <span style="font-family:Courier New" id="successes">Successes </span>
*Coming soon*


## <span style="font-family:Courier New" id="future">Potential Future Features </span>
*Coming soon*


## <span style="font-family:Courier New" id="lessons">Lessons Learned </span>
*Coming soon*

