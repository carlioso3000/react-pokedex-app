import React, { useState, useEffect } from "react";
import { getAllPokemons, getPokemonDetails } from "../../utils/api";
import { Row, Col, Pagination } from "antd";
import CardPokemon from "../pokemon-card/card.jsx";
import Loader from "../loader/loader";

function SearchedPokemonList({ searchedPokemon }) {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20;

  async function fetchData() {
    setIsLoading(true);
    const data = await getAllPokemons();
    setTotalPokemons(data.count);
    
    const details = await getPokemonDetails(data.results);
    setPokemons(
      details.map((pokemon) => ({
        name: pokemon.name,
        sprite: pokemon.sprites.other["official-artwork"].front_default,
        type: pokemon.types.map((type) => type.type.name),
        id: pokemon.id,
      }))
    );
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const searchedPokemons = searchedPokemon
    ? pokemons.filter((pokemon) => pokemon.name.includes(searchedPokemon))
    : pokemons;

  // gets the view to top of the vh when the current page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Row gutter={[16, 16]}>
          {searchedPokemons
            .slice(
              (currentPage - 1) * pokemonsPerPage,
              currentPage * pokemonsPerPage
            )
            .map((pokemon) => (
              <Col
                key={pokemon.name}
                xs={24}
                sm={12}
                md={6}
                lg={4}
                style={{ display: "flex" }}
              >
                <CardPokemon
                  pokemonId={pokemon.id}
                  pokemonName={pokemon.name}
                  pokemonImage={pokemon.sprite}
                  pokemonType={pokemon.type}
                />
              </Col>
            ))}
        </Row>
      )}
      <Pagination
        current={currentPage}
        total={totalPokemons}
        pageSize={pokemonsPerPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default SearchedPokemonList;
