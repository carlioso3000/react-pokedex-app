import React, { useState, useEffect } from 'react';
import { getPokemonList, getPokemonDetails } from '../../utils/api.jsx';
import { Row, Col, Pagination } from 'antd';
import CardPokemon from '../pokemon-card/card.jsx';


function PokemonList() {
  //State to store the list of pokemons to display
  const [pokemons, setPokemons] = useState([]); 
  //State to store the total number of pokemons available in the API
  const [totalPokemons, setTotalPokemons] = useState(0);
   //State to store the current page number
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;

//Function to fetch data from the Poke API for the given page
  async function fetchData(page) {
    //Calculate the offset based on the current page and the number of pokemons per page
    const offset = (page - 1) * pokemonsPerPage;
    //Fetch the list of pokemons from the Poke API
    const data = await getPokemonList(offset);
    //Update the total number of pokemons available in the API
    setTotalPokemons(data.count);
    console.log(data)
    // Fetch details for each pokemon in the list
    const details = await getPokemonDetails(data.results);
    //Update the list of pokemons to display with the fetched data(details)
    setPokemons(details.map(pokemon => ({
      name: pokemon.name,
      sprite: pokemon.sprites.other["official-artwork"].front_default,
      type: pokemon.types.map((type) => type.type.name),
      id: pokemon.id
    })));
  }

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData(1);
  }, []);

// Effect to fetch data when the current page changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  



  return(
    <>
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
      <Pagination 
        current={currentPage}
        total={totalPokemons}
        pageSize={pokemonsPerPage}
        onChange={page => setCurrentPage(page)}
      />
    </>

  );
}

export default PokemonList;