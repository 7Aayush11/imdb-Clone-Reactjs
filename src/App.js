import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Searched from './Components/Searched';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SearchContext from './Context/SearchContext';
import FullMovieDetail from './Components/FullMovieDetail';
import Saved from './Components/Saved';
import SignUp from './Components/Signup';
import Alert from './Components/Alert';
import Login from './Components/Login';

const {SearchState} = SearchContext;
function App() {

  return (
    <div>
      <Router>
        <SearchState>
          <Navbar />
          <Alert/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/saved" element={<Saved />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/search/:ele" element={<Searched />} />
              <Route exact path="/:title/see-more" element={<FullMovieDetail />} />
            </Routes>
          </div>
        </SearchState>
      </Router>
    </div>
  );
}

export default App;