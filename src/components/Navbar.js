import './Navbar.css';
import { Link } from 'react-router-dom';


function Navbar () {

    return (
    <div className ="container">
        <nav className="navbar">
         <div className ="logo" >
            <Link to="/">
            <img className="logo-image" src='/imgs/logo.png' alt="logo"></img>
            </Link>

          </div>
        
            <ul>
                <li><Link to ="/visualization"> visualization </Link> </li>
                <li> <Link to ="/games">games  </Link> </li>
                <li><Link to="/rizzkitch">rizzkitch </Link> </li>
                <li><Link to="/projects"> projects </Link> </li>
                <li><Link to="/contact"> contact </Link> </li>
                
            </ul>
        </nav>
        </div>
    )
}

export default Navbar;