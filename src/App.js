import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Searched from './Components/Searched';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SearchContext from './Context/SearchContext';

const {SearchState} = SearchContext;
function App() {

  return (
    <div>
      <Router>
        <SearchState>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/search/:ele" element={<Searched />} />
            </Routes>
          </div>
        </SearchState>
      </Router>
    </div>
  );
}

export default App;