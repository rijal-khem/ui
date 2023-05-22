
import './App.css';
import Navbar from './components/Navbar';

import Visualization from './components/Visualizations/Visualization';
import Games from './components/Game/Games';
import Projects from './components/Projects';
import Contact from './components/Contact'
import Home from './components/Home'

import { BrowserRouter as Router, Route,Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>

        <div>
        <Navbar/>
        </div>
         <Routes>
          <Route path="/" element ={<Home/>} />
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
