
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Visualization from './components/Visualization';
import Games from './components/Game/Games';
import Projects from './components/Projects';
import Contact from './components/Contact'

import { BrowserRouter as Router, Route,Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>

        <div>
        <Navbar/>
        </div>
         <Routes>
           <Route path="/about" element={<About/>} />
           <Route path="/visualization" element ={<Visualization/>} />
           <Route path="/games" element={<Games/>} />
           <Route path="/projects" element={<Projects/>} />
           <Route path="/contacts" element ={<Contact/> } />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
