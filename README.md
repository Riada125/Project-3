# Project-3-the-kitchen

## Overview

This project made up the third project of General Assembly's Software Engineering Immersive program. We were sorted into predefined teams and were instructed to build a full stack browser application.

We were required to:

* Work in a team, using git to code collaboratively
* Build a full-stack application by making your own backend and your own front-end
* Use an Express API to serve our data from a Mongo database
* Handle API requests with a separate front-end built with React

The resulting application titled 'the-kitchen' was constructed with team members [Michael](https://github.com/mjadair) & [Reggie](https://github.com/mr-anansi).
​
## Installation

We used Node Package Manager to install all of our dependencies.

When running this project in a local environment, run `npm install` in the CLI to ensure all dependencies are present before launch.

​
## Technologies used

#### Front-end

* HTML5
* CSS3
* SCSS
* JavaScript (ES6)
* React.js

#### Back-end

* Node.js
* Express.js
* MongoDB

#### Additional Libraries

* Bulma
* React Hooks, Animations
* Emailjs
* Toastify

#### Bundler

* Webpack

## Approach

### Technical change

We had largely been taught React in the form of class and simple components up until this point, however, we had been introduced to the concept of hooks a couple days prior to the project start date.

We took the opportunity to display our progress with the new format of code construction and built the majority of our components in the new format. 

Previous class component snippet (from project 2):

```

class Input extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      postcode: null,
      errors: '',
      export: {
        longitude: null,
        latitude: null
      }
    }
  }

  handleChange(e) {
    const postcode = (e.target.value).replace(/\s/g, '')
    this.setState({
      postcode: postcode,
      errors: ''
    })
  }

```

Example of the different format our components took with hooks (curent project):


```
const EditProfile = (props) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const { userInfo, setUserInfo } = useContext(UserContext)

  useEffect(() => {
    if (userInfo) {
      setData(userInfo)
    }
  }, [userInfo])

  const sendUpdates = () => {
    axios.put('/api/profile/edit', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        setUserInfo(res.data.user)
        props.history.push('/profile')
      })
      .catch(err => {
        setErrors(err.response.data.errors)
      })
  }


```

### Methodology

We began this project with a brainstorming document that took into account the areas we were interested in and the ideas we were interested in fleshing out. 

Our ideas ranged around the arts and we eventually settled on a food-focussed app with myself and [Michael](https://github.com/mjadair) particularly passionate about any research involved! Though our other team-mate was less keen on the idea, we used this to our advantage as we were able to adopt the perspective of a user less passionate about food and cooking to create a site for all interests. 

Our goal was to create something that would address one’s food needs, whether in a foodie state of mind or otherwise. Our stretch goal was to have a user funnel that was guided by matching the users personalisations to our data.

We investigated some external APIs in order to provide the information that was required for the app. We ultimately decided, however to create our own information so that full flexibility could be established with our endpoints.

In order to ensure we had enough data for the user to be able to sort through, we decided to get to work on seeding the data first. 

Once this was done we concentrated on getting our backend routes and data delivery done first, before moving on to the front end.

## Wireframes

(coming soon)

## Seeding

Since we were relying on no external data sources, we had a task on our hands to create the data that users would be able to cycle through. As this was a curation app, we wanted to be able to provide specific results, yet have enough options for the user to experience a large enough degree of choice.

The seeding data was separated into two categories and then constructed in JSON format. 

In order to create the user-data relationship, an allocation for the user in the restaurant and recipe model was created. 

In an attempt to categorize and edit the data faster, the seeding file was customised, allowing a single user to be created and attached to the first type of data objects, before using the same user to create the second set.

Each file was created in the following format:

```
const recipeSeed = (user) => {
  return [{
    name: 'Pappardelle with nduja, mascarpone and lemon',
    author: 'Michael',
    about: '',
    ingredients: ['Tagliatelle', 'Nduja', 'Mascarpone', 'Lemons (zest and juice)', 'Parsley', 'Parmesan', 'Olive oil'],
    method: ['Fry the nduja in the olive oil.', 'When the nduja has melted, add the lemon zest and juice, allow to infuse for a couple of minutes.', 'Add the mascarpone, reduce heat and stir', 'Once the sauce has thickened, add the cooked pasta and a tablespoon of its cooking water.', 'Serve topped with chopped parsley and parmesan'],
    image: 'https://i.imgur.com/rEM6L2U.jpg SameSite=None Secure',
    category: ['Pasta', 'Spicy', 'Dinner', 'Easy'],
    type: ['Dinner'],
    dietary: ['Spicy'],
    serves: '',
    complexity: 'Easy',
    time: '30mins or less!',
    user: user
  },
  {
    name: 'Sourdough Bread',
    author: 'Michael',
    about: '',
    ingredients: ['400g Strong White Bread Flour', '145g Rye Starter', '50g Rye Flour', '50g Wholemeal Flour', '12g Sea Salt', 'Olive Oil', 'Semolina (for dusting)'],
    method: ['Mix the flours and the starter.', 'Knead until the gluten develops.', 'Fold, then rest for 12 hours. Bake.'],
    image: 'https://imgur.com/PQaorBZ.jpg SameSite=None Secure',
    category: ['Baking'],
    type: ['Breakfast', 'Lunch', 'Dinner', 'Side', 'Bit more effort'],
    dietary: [''],
    complexity: 'Bit more effort',
    serves: '',
    time: '3 days',
    user: user
  },...
  

```

This enabled two large files to be created separately as well as a shorter user seed script file. The data created as follows:

```
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
        console.log(`${'👨‍💻'.repeat(users.length)} users created`)
        //this is passing in a function defined in your external file
        return Recipe.create(recipeSeed(users[0]))
      })
      .then(recipes => console.log(`${recipes.length} recipes created`))
      .catch(err => console.log(err))
      //complete it with one and then find the user again
      .then(() => {
        return User.find({
          username: 'Admin'
        })
      })
      //then pass in another seed creation file/function
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

```


## Features

It was important to keep the user experience seamless. We had previously used secure routes to deliver user simple information to the specific user who created it.  This was expanded on by creating paths for both logged out users and authenticated users.

In order to work towards personalisation, methods of user information sharing were looked into.

There was an investigation into some of the newer hook features of React with the security of the user information a prime concern. We wanted to reduce the calls to the backend while defining the user information deeper in the component tree (Pass the information around once the user logs in as opposed to the first page on visit). 

Ultimately we used the useContext hook to enable the user data to be stored and distributed at app level on this single login event. This enabled the users’ information to be referenced on any page, allowing for features like one click email and updated user personalisations on our information pages with a single user information call to the backend. 

To tackle the refresh issue with regards to state, a conditional call (based on the availability of the jwt token) was built in at app level. This ensured that the call only ran when a user had logged in and refreshed the page.

When the app is refreshed this code allows a log in check to take place:

```
useEffect(() => {
    if (Auth.isAuthorized()) {
      axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
        .then(response => {
          setUserInfo(response.data.user)
        })
        .catch(error => {
          console.log(error)
          setUserInfo(null)
          Auth.logout()
          props.history.push('/login')
        })
    }
  }, [])

```

We used the hook for features such as the add to profile favourites (with the ability for the add button to disabled once added to profile), the profile layout, links and the ability to make alterations to a user’s profile information.

```
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
      .catch(() => {
        props.history.push('/login')
      })
  }

```


The editing of comments was resolved by using useContext as well. Essentially, as the comments section was rendered by the recipe page but existed as a separate form, this data needed to be updated by a state that was available to both components. Once the comments were edited or deleted, the useContext recipe info was updated with the response and then the page was re-rendered in the higher level component providing a real-time change on the page.

```
      {reci && reci.comments.map((comments, i) => {
        return <CommentCard key={i} comments={comments} recipeInfo={data} setRecipeInfo={setData} isOwner={isOwner} props={props} />
      })}


```

Here the page information is updated within a deeper component (a form):

The useContext hook is first declared and set at page level:

```
  const { reci, setReci } = useContext(ReciContext)

```

Since the comments affect the data on the page, once the data is submitted the form updates the global variable for an immediate page update:

```
  const handleDelete = () => {
    axios.delete(`/api/recipes/${recipeInfo._id}/comments/${comments._id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        setReci(res.data)
      })
      .catch(err => console.log(err))
  }

```


In other areas of the app, the 'new recipe' form provided the challenge of adding multiple inputs into an array for a single field. This was achieved through coercing the changing form information into an array using the input index. Take a look at the example:

The change handler would create and maintain the data in array format:

```

  const handleMultiChange = (e, i) => {
    data[e.target.name][i] = e.target.value
    setData({ ...data, [e.target.name]: data[e.target.name] }) 
    setErrors({})
  }

```

The amount of inputs would be generated according to the array length as the elements were mapped out:

```

data.ingredients.map((ingredient, i) => {
          return (
            <div key={i} className='field'>
              <div className='control'>
                <label htmlFor='' className="label has-text-white">
                  Add ingredient {i + 1}
                  <input onChange={(e) => handleMultiChange(e,i)} className='input is-info' type='text' name={'ingredients'} />
                </label>
              </div>

```

The add button would add another array value, thereby extending the array and creating another index:

```
const addItem = () => {
    setData({ ...data, ingredients: [...data.ingredients, '' ] })
  }

```

## Styling

For styling, we created a food-art theme throughout. 

We created a classic home page, recipe, restaurant and profile pages - all of which incorporated similar watercolor images. The home page highlighted the two fundamental user decision: eat in or eat out.

The home page:

![](readme-images/P3 homepage.png)


We also made use of additional React Library features such as the parallax effect from React parallax to add some animations to the experience:

```

class LandingPage extends React.Component {
  state = { hovering: false }
	
  render() {
    return <div style={styles}>
      <Parallax
        bgImage={image4}
        strength={300}
        renderLayer={percentage => (
          <div>
            <div
              style={{
                position: 'absolute',
                background: `rgba(255, 125, 0, ${percentage * 1})`,
                left: '50%',
                top: '50%',
                borderRadius: '50%',
                transform: 'translate(-50%,-50%)',
                width: percentage * 700,
                height: percentage * 700
              }}
            />
          </div>
        )}>
        <div style={{ height: 900 }}>
          <div style={insideStyles}>The Kitchen</div>
        </div>
      </Parallax>


```

## Categorization

Recipes and Restaurants worked on similar categorization principles. Each top level page for recipes and restaurants were constructed in two sections. The first consisted of the filter action and the second was the result of the filtered process.

```
return <div className="recipes">
    <div className="section">
      <h1 className="is-size-1 is-black has-text-centered">Have a look at these Recipes...</h1>
      <h2 className="is-black has-text-centered" style={{ margin: '20px 0 20px 0' }}>Or sign up to add your own</h2>
      <div className="container">
        <div>
          <FilteredRecipeForm
            Recipes={filteredData}
            updateRecipes={filterRecipes}
          />
        </div>
        <div className="columns is-multiline">
          {filteredData.map((results, i) => {
            return <RecipeCard key={i} results={results} />
          })}
        </div>
      </div>
    </div>
  </div>
}

```

A call at the top level to all of the data happened on visit of the page and then the filtering would take place (in this specific example) at the 'FilteredRecipeForm' level by passing down the required functions through props. User-inputted information can query the recipe/restaurant information by way of the categories assigned to our app data on creation. Through the use of React select, multiple queries in the form of tags could be generated.

This was particularly challenging, and required a collaborative effort as we ran into a number of issues, such as, with the structure of the data. In order to filter, we had to retrieve each tag from the schema, remove any repition and create a function that matches chosen tags with tags in each restaurants/recipes schema - which can be multiple. However, through carefully breaking down the issue together we were able to come to a solution. 

```
function filterRecipes(tags) {
    if (tags.length === 0) {
      return setFilteredData([...initialData])
    }
    const types = tags.map(item => item.value)
    const recipes = initialData.filter((recipe) => {
      return types.every(element => recipe.category.includes(element))
    })
    setFilteredData(recipes)
  }

```

```
function handleSelect(selectedItems) {
    if (selectedItems === null) return updateRecipes([])
    updateRecipes([...selectedItems])
    console.log(...selectedItems)
  }


  return <Select
    isMulti
    name="tags"
    options={allTagsLabeled}
    onChange={handleSelect}
    className="basic-multi-select"
    classNamePrefix="select"
    placeholder="Choose by category here..."

  />

``` 

## Bugs & Challenges

We initially had some issues with the creation of new recipes for new users. This was to do with the data that was stored in the multi select fields. In the method section, once multiple fields were added, the data would not recognise the entries in an array format and simply send unrecognisable data to the database which would then discard it. Through a review we managed to keep the data in array format and solve the issue.

We found that navigation through the app after scrolling down a page would keep the window height at the same mid or low level if a page was changed. This caused some visual issues specifically for our restaurant pages that required the user to start at the top and scroll down for the best effect.

This was tackled by adding a listener function that returned the scroll position to the top and wrapping the required components with this 'ScrollToTop' component.

As a result of time constraints, the mobile experience has not been optimised and so some inconsistencies are present on smaller screens.

## Future Features

We would of liked to provide the guided path we had in mind at the initial stage, however time restricted us to the core library aspect as a deliverable. 

In our plans, the user could get more of the tailored experience through progressing through the funnel. This way they would be guided to the best and fastest output relative to their saved preferences. 

In order to achieve the user path, more work on the filter and UX aspects of the app is needed. In addition, mobile optimisation is required. These elements may come in future iterations of the project.
