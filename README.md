### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# <span style="font-family:Courier New">The Kitchen </span>🍴
by [Michael Adair](https://github.com/mjadair), [Marissa Epstein](https://github.com/marepstein) and [Reggie Tachie-Menson](https://github.com/reggiemenson)

## <span style="font-family:Courier New">Overview </span>

The Kitchen is a full-stack app that includes a RESTful API built with Express, MonogoDB and NodeJS and a React Front-end. 

The concept was to build an app that asked users if they wanted to dine-in or eat-out and then provide them with options based on the decision. 

The dine-in portion of the website allows users to search recipes from our database, it also allows logged in users to add their own recipes, much like a virtual recipe book and the user can also have shopping lists for each recipe emailed to their registered email address.

The eat-out section gives users details about London restaurants from our own database. 

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

```
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
  | /show   	|  x  	|     	|    	|       
  | /edit   	|    	|     	|  x  	|      	|


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



- `/circle` is the most complex route, having all four possible options. 
  - The GET route returns a list of all the users who have requested to be added to the request maker's circle, as well as all currently approved users.
  - The POST route is used to request another user to be added to the request maker's circle, by using the other's username. The API then adds the request maker's ID to that user's 'Requested' list. 
  - The PUT route approves one of the users from the request maker's requests list, again by providing their username.
  - The DELETE route removes one of the users from the request maker's approved list and therefore from that user's circle, also by providing their username.

2. Location

  |                      	| GET 	| POST 	| PUT 	| DELETE 	|
  |----------------------	|-----	|------	|-----	|--------	|
  | /locations           	|  x  	|   x  	|     	|        	|
  | /locations/available 	|  x  	|      	|     	|        	|
  | /locations/:id       	|  x  	|      	|  x  	|    x   	|

- `/locations` has both a GET route, which was only used for development and provides all locations in the database, and a POST route, where users can post new locations to the database.
- `/locations/available` only has a GET route, which provides a complete list of all the locations that the request maker has access to (i.e. all locations of their own, those shared by their circle and all public locations).
- `/locations/:id` has the following routes for a single location identified by the ID: 
  - The GET route provides all information of that location.
  - The PUT route allows that information to be altered by new data provided, but only by the user who created the location.
  - The DELETE route allows the user who created the location to delete it as well.


### <span style="font-family:Courier New" id="front"><ins>Front-End</ins></span>

## <span style="font-family:Courier New" id="challenges">Challenges </span>


## <span style="font-family:Courier New" id="successes">Successes </span>


## <span style="font-family:Courier New" id="future">Potential Future Features </span>


## <span style="font-family:Courier New" id="lessons">Lessons Learned </span>

