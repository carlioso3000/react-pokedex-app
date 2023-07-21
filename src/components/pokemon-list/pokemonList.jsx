import React, { useState, useEffect } from 'react';
import { getPokemonList } from '../../utils/api.jsx';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonList();
      setPokemons(data.results);
    }
    fetchData();
  }, []);

  return(
    <ul>
      {pokemons.map(pokemon => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </ul>
  );
}

export default PokemonList;