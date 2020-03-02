import React  from 'react'
import Select from 'react-select'

const FilteredRecipeForm = ({ Recipes, updateRecipes }) => {

  // finds all the categories to be added to the page as clickable links
  const createTags = Recipes.map((recipe) => {
    return recipe.category
  })

  const tagsArray = createTags.flat()
  const allTags = [...new Set(tagsArray)]

  const allTagsLabeled = allTags.map((tag) => {
    return { value: tag, label: tag }
  })

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
}
export default FilteredRecipeForm
