import React, { useState, useEffect } from "react";
import { getPokemonPerType } from "../../utils/api";
import { Row, Col, Pagination } from "antd";
import CardPokemon from "../pokemon-card/card.jsx";
import Loader from "../loader/loader";

function FilteredPokemonList({ selectedType }) {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 50;

  async function fetchData() {
    setIsLoading(true);
    const data = await getPokemonPerType(selectedType);
    setTotalPokemons(data.length);
    setPokemons(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // gets the view to top of the vh when the current page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const filteredPokemons = selectedType
    ? pokemons.filter((pokemon) => pokemon.type.includes(selectedType))
    : pokemons;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredPokemons
            .slice(
              (currentPage - 1) * pokemonsPerPage,
              currentPage * pokemonsPerPage
            )
            .map((pokemon) => (
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

export default FilteredPokemonList;
