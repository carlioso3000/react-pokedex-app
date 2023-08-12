// It provides a list of all pokemons
async function getAllPokemons() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20000&offset=0`);
    const allPokemonList = await response.json();
    return allPokemonList;
  } catch (error) {
    console.error(error);
    return [];
  }
}
// It provides a list of 20 pokemons per page
async function getPokemonList(offset) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=50&offset=${offset}`);
    const pokemonList = await response.json();
    return pokemonList;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// it provides pokemon details
async function getPokemonDetails(pokemonList) {
  try {
    const promises = pokemonList.map(pokemon => fetch(pokemon.url).then(res => res.json()));
    const pokemonDetails = await Promise.all(promises);
    return pokemonDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//it provides pokemon filtered per types
async function getPokemonPerType(type) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    const pokemonData = await Promise.all(data.pokemon.map(async ({ pokemon }) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonDetails = await pokemonResponse.json();
      return {
        name: pokemonDetails.name,
        sprite: pokemonDetails.sprites.other["official-artwork"].front_default,
        type: pokemonDetails.types.map((type) => type.type.name),
        id: pokemonDetails.id
      };
    }));
    return pokemonData;
  } catch (error) {
    console.error(error);
    return [];
  }
}
//it provides pokemon stats for PokemonStats Page
async function getPokemonStats(pokemon){
  const isId = !isNaN(pokemon);
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${isId ? pokemon : pokemon.toLowerCase()}/`);
  const pokemonStats = await response.json();


  // here i will obtain evolution information
  const responseForEvolutions = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${isId ? pokemon : pokemon.toLowerCase()}/`);
  const speciesData = await responseForEvolutions.json();
  const evolutionUrl = speciesData.evolution_chain.url;
  const evolutionRes = await fetch(evolutionUrl);
  const evolutionData = await evolutionRes.json();
  

  return { evolutionData, pokemonStats };
}

export {
  getPokemonDetails,
  getPokemonList,
  getAllPokemons,
  getPokemonStats,
  getPokemonPerType,
};