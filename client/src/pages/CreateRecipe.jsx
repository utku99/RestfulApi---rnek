import React, { useState } from 'react'
import axios from "axios"

import { useGetUserId } from '../hooks/useGetUserId'
import { useCookies } from 'react-cookie'

const CreateRecipe = () => {
  const userID = useGetUserId()
  const [cookies,] = useCookies(["access_token"])

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID
  })


  const onChangeHandler = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    })
  }

  const ingredientHandler = (e, i) => {
    const ingredients = [...recipe.ingredients]
    ingredients[i] = e.target.value
    setRecipe({
      ...recipe,
      ingredients  // ingredients(state) : ingredients(copy)  
    })
  }

  const addIngredient = () => {
    const ingredients = [...recipe.ingredients, ""]
    setRecipe({
      ...recipe,
      ingredients
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/recipes", 
      recipe, 
      { headers: { authorization: cookies.access_token } })
      console.log("recipe created");
      window.location = "/"
    } catch (error) {
      console.log("recipe not created", error);
    }
  }

 
  return (
    <div className='create-recipe'>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' onChange={onChangeHandler} />
        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((item, i) => (
          <input key={i} type='text' name='ingredients' value={item} onChange={(e) => ingredientHandler(e, i)} />
        ))}
        <button onClick={addIngredient} type='button'>Add Ingredient</button>
        <label htmlFor='instructions'>Instructions</label>
        <textarea id='instructions' name='instructions' onChange={onChangeHandler}></textarea>
        <label htmlFor='imageUrl'>image Url</label>
        <input type='text' id='imageUrl' name='imageUrl' onChange={onChangeHandler} />
        <label htmlFor='cookingTime'>Cooking Time (minutes)</label>
        <input type='number' id='cookingTime' name='cookingTime' onChange={onChangeHandler} />
        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipe
