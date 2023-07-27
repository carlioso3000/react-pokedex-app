import React, { useState, useEffect } from 'react';
import { getPokemonDetails, getPokemonList } from '../../utils/api.jsx';
import { Row, Col, Pagination } from 'antd';
import CardPokemon from '../pokemon-card/card.jsx';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]); 
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;
  
  async function fetchData() {
    const offset = (currentPage - 1) * pokemonsPerPage;
    const data = await getPokemonList(offset);
    setTotalPokemons(data.count);
    const details = await getPokemonDetails(data.results);
    setPokemons(details.map(pokemon => ({
      name: pokemon.name,
      sprite: pokemon.sprites.other["official-artwork"].front_default,
      type: pokemon.types.map((type) => type.type.name),
      id: pokemon.id
    })));
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return(
    <>
      <Row gutter={[16, 16]}>
        {pokemons.map(pokemon => (
          <Col key={pokemon.name} xs={24} sm={12} md={6} lg={4}>
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










// import React, { useState, useEffect } from 'react';
// import { getPokemonList, getPokemonDetails } from '../../utils/api.jsx';
// import { Row, Col, Pagination } from 'antd';
// import CardPokemon from '../pokemon-card/card.jsx';


// function PokemonList({ selectedType }) {
//   const [pokemons, setPokemons] = useState([]); 
//   const [totalPokemons, setTotalPokemons] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pokemonsPerPage = 20;
  
//   async function fetchData(page) {
//     const offset = (page - 1) * pokemonsPerPage;
//     const data = await getPokemonList(offset);
//     setTotalPokemons(data.count);
//     console.log(data)
//     const details = await getPokemonDetails(data.results);
//     setPokemons(details.map(pokemon => ({
//       name: pokemon.name,
//       sprite: pokemon.sprites.other["official-artwork"].front_default,
//       type: pokemon.types.map((type) => type.type.name),
//       id: pokemon.id
//     })));
//   }

//   useEffect(() => {
//     fetchData(1);
//   }, []);

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

// const filteredPokemons = selectedType
// ? pokemons.filter(pokemon => pokemon.type.includes(selectedType))
// : pokemons;



//   return(
//     <>
//       <Row gutter={[16, 16]}>
//       {pokemons.map(pokemon => (
//         <Col key={pokemon.name} xs={24} sm={12} md={6} lg={6}>
//           <CardPokemon
//             pokemonId={pokemon.id}
//             pokemonName={pokemon.name}
//             pokemonImage={pokemon.sprite}
//             pokemonType={pokemon.type}
//           />
//         </Col>
//         ))}
//       </Row>
//       <Pagination 
//         current={currentPage}
//         total={totalPokemons}
//         pageSize={pokemonsPerPage}
//         onChange={page => setCurrentPage(page)}
//       />
//     </>

//   );
// }

// export default PokemonList;