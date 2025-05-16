import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SummonersList from './SummonersList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match/:region/:name/:tag" element={<SummonersList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
