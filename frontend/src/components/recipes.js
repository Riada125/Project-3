import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeCard from './recipecard'
import FilteredRecipeForm from './FilteredRecipeForm'



const Recipes = () => {
  const [initialData, setInitialData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  //***********************Fetches all Recipes from the API */
  useEffect(() => {
    axios.get('/api/recipes')
      .then(response => {
        setInitialData(response.data)
        setFilteredData([...response.data])
      })
      .catch(error => console.log(error))
  }, [])
	


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
export default Recipes

