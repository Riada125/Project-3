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

**Models**

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

Users can also comment on Recipes and so we also have a comment Schema:

```js
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})
```


### <span style="font-family:Courier New" id="front">Front-End</span>

## <span style="font-family:Courier New" id="challenges">Challenges </span>


## <span style="font-family:Courier New" id="successes">Successes </span>


## <span style="font-family:Courier New" id="future">Potential Future Features </span>


## <span style="font-family:Courier New" id="lessons">Lessons Learned </span>

