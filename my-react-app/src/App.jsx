import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";
import "./css/App.css";

function App() {
  return (
    <MovieProvider>
      <Navbar />
    <main className = "main-content">
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/favorites" element = {<Favorites />} />

      </Routes>

    </main>
    </MovieProvider>
  );
}

export default App;
