import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Auth from './pages/Auth'
import SavedRecipe from './pages/SavedRecipe'
import CreateRecipe from './pages/CreateRecipe'
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipe />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
