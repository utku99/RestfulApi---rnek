import React, { useEffect, useState } from 'react'
import axios from "axios"

import { useGetUserId } from "../hooks/useGetUserId.js"

const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([])
  const userID = useGetUserId()
 

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`)
        setSavedRecipes(response.data.savedRecipes)
      } catch (error) {
        console.log(error);
      }
    }
    fetchSavedRecipe()
  }, [])


  return (
    <div className='home'>
      <h1>Saved Recipes</h1>
      <ul>
        {
          savedRecipes.map((item) => (
            <li key={item._id}>
              <div>
                <h2>{item.name}</h2>
              </div>
              <div className='instruction'>
                <p>{item.instructions}</p>
              </div>
              <img src={item.imageUrl} alt={item.name} />
              <p>Cooking Time: {item.cookingTime} minutes</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SavedRecipe
