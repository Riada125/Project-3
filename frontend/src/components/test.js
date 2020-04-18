import React, { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import axios from 'axios'
import FilteredForm from './filterForm'

const Restaurants = () => {
  const [initialData, setInitialData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  useEffect(() => {
    axios.get('/api/restaurants')
      .then(res => {
        setInitialData(res.data)
        setFilteredData([...res.data])
      })
      .catch(err => console.log(err))
  }, [])
    
  function filterRestaurants(typesToFilterBy) {
    if (typesToFilterBy.length === 0) {
      return setFilteredData([...initialData])
    }
    const types = typesToFilterBy.map(item => item.value)
    const restaurants = filteredData.filter((restaurant) => {
      return restaurant.category.some(item => types.includes(item))
    })
    setFilteredData(restaurants)
  }
    

    
  return <div className="restaurants">
    <div className="section">
    </div>
    <FilteredForm 
      Restaurants={filteredData}
      updateRestaurants={filterRestaurants}
    />
    <div className="section has-text-centered">
      <div className="container is-center">
        <div className="column is-centered">
          <div>{filteredData.map((restaurant, index) => {
            return <RestaurantCard key={index} restaurant={restaurant} />
          })}</div>
        </div>
      </div>
    </div>
  </div>
}
export default Restaurants