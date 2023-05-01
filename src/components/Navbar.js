import './Navbar.css';
import { Link } from 'react-router-dom';


function Navbar () {

    return (
        <nav class="navbar">
        
            <ul>
                <li ><Link to="/about">about</Link>  </li>
                <li><Link to ="/visualization"> visualization </Link> </li>
                <li> <Link to ="/games">games  </Link> </li>
                <li><Link to="/rizzkitch">rizzkitch </Link> </li>
                <li><Link to="/projects"> projects </Link> </li>
                <li><Link to="/contact"> contact </Link> </li>
                
            </ul>
        </nav>
    )
}

export default Navbar;