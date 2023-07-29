import PokemonList from './components/pokemon-list/defaultPokemonList.jsx';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/homepage/index.jsx';
import PokemonStats from '../src/pages/pokemon-stats/pokemonStats.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon-stats/:id" element={<PokemonStats />} />
          {/* <Route path="/pokemon-vs" element={<PokemonVs />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
