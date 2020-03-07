import React, { useState, useEffect } from 'react'
import Select from 'react-select'

const FilteredForm = ({ Restaurants, updateRestaurants }) => {

  const filterOptions = Restaurants.map((restaurant) => {
    return restaurant.category
  })
	
  const tagsArray = filterOptions.flat()

  const allTags = [...new Set(tagsArray)]
	
  const allTagsLabeled = allTags.map((tag) => {
    return { value: tag, label: tag }
  })

 
  function handleSelect(selectedItems) {
    if (selectedItems === null) return updateRestaurants([])
    updateRestaurants([...selectedItems])
  }

  return <Select
    isMulti
    name="tags"
    options={allTagsLabeled} 
    onChange={handleSelect}
    className="basic-multi-select"
    classNamePrefix="select"
    placeholder="Search by category..."
  />
}

export default FilteredForm







