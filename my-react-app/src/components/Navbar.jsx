import {Link} from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
    return <nav className = "navbar">
        <div className = "navbar-brand">
            <Link to = "/">💻 Dream Movies</Link>
        </div>
        <div className = "navbar-links">
            <Link to = "/" className = "nav-link">🏠Home</Link>
            <Link to = "/favorites" className = "nav-link">⭐Favorites</Link>
        </div>

        <div className="created-by">
            <p></p>
        </div>
    </nav>
}

export default Navbar;