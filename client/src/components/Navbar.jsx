import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie"

const Navbar = () => {

  const [cookies, setCookies] = useCookies(["access_token"])

  const logOut = () => {
    setCookies("access_token", "")
    localStorage.removeItem("userID")
    window.location = "/auth"
  }


  return (

    <div className='navbar'>
      <Link to={"/"}>Home</Link>
      


      {
        cookies.access_token ?
          <>
          <Link to={"/create-recipe"}>Create Recipe</Link>
          <Link to={"/saved-recipes"}>Saved Recipes</Link>
            <button onClick={logOut} className='logout-btn'>Log out</button>
            
          </>


          : <Link to={"/auth"}>Login/Register</Link>

      }


    </div>
  )
}

export default Navbar
