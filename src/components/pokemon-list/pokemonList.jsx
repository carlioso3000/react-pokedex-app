import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonDetails } from '../../utils/api.jsx';
import { Row, Col } from 'antd';
import CardPokemon from '../pokemon-card/card.jsx';


function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonList();
      const details = await getPokemonDetails(data.results);
      setPokemons(details.map(pokemon => ({
        name: pokemon.name,
        sprite: pokemon.sprites.other["official-artwork"].front_default,
        type: pokemon.types.map((type) => type.type.name),
        id: pokemon.id
      })));
    }
    fetchData();
  }, []);

  return(

    <Row gutter={[16, 16]}>
      {pokemons.map(pokemon => (
        <Col key={pokemon.name} xs={24} sm={12} md={6} lg={6}>
          <CardPokemon
            pokemonId={pokemon.id}
            pokemonName={pokemon.name}
            pokemonImage={pokemon.sprite}
            pokemonType={pokemon.type}
          />
        </Col>
      ))}
    </Row>
  );
}

export default PokemonList;