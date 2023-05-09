import React, { useEffect, useState } from 'react'
import axios from "axios"

import { useGetUserId } from "../hooks/useGetUserId.js"
import { useCookies } from "react-cookie"

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [cookies,] = useCookies(["access_token"])

  const userID = useGetUserId()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes")
        setRecipes(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/id/${userID}`)
        setSavedRecipes(response.data.savedRecipes)
      } catch (error) {
        console.log(error);
      }
    }

    fetchRecipe()
    fetchSavedRecipe()
  }, [])

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes",
        { recipeID, userID },
        { headers: { authorization: cookies.access_token } })
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  const isRecipeSaved = (id) => {
    if (savedRecipes.includes(id))
      return true
  }

  return (
    <div className='home'>
      <h1>Recipes</h1>
      <ul>
        {
          recipes.map((item) => (
            <li key={item._id}>
              {savedRecipes.includes(item._id) && <h5>Already Saved</h5>}
              <div className='save-btn'>
                <h2>{item.name}</h2>
                <button onClick={() => saveRecipe(item._id)} disabled={isRecipeSaved(item._id)}>Save</button>
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

export default Home
