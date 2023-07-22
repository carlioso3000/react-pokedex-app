import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonDetails } from '../../utils/api.jsx';


function PokemonList({ nombre, imagen, tipo, detipo}) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonList();
      const details = await getPokemonDetails(data.results);
      setPokemons(details.map(pokemon => ({
        name: pokemon.name,
        sprite: pokemon.sprites.other["official-artwork"].front_default,
        type: pokemon.types.map((type) => type.type.name)
      })));
    }
    fetchData();
  }, []);

  return(

        <ul>
          {pokemons.map(pokemon => (
            <li key={pokemon.name}>
              <img src={pokemon.sprite} alt={pokemon.name + " image"} width="150" height="150" />
              <p>{pokemon.name}</p>
              <p>Type: {pokemon.type.join(', ')}</p>
            </li>
          ))}
      </ul>
    
  );
}

export default PokemonList;