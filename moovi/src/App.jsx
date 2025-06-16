import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home'
import Categories from './pages/Categories/categories'
import Movies from './pages/Movies/Movies'
import Series from './pages/Series/Series'
import Navigationbar from './components/header/navigationbar'
import MovieDetails from './components/containes/moviesdetails'
import Footer from "./components/footer/footers";
function App() {
 

  return (
    <>
   <BrowserRouter>
   <Navigationbar />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element ={<Categories />} />
    <Route path="/movies" element={<Movies />} />
    <Route path="/tvshows" element={<Series/>} />
    <Route path="/movie/:id" element={<MovieDetails />} />

    

   </Routes>
   <Footer />
   </BrowserRouter>
    </>
  )
}

export default App
