// It provides a list of all pokemons
async function getAllPokemons() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20000&offset=0`)
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
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`);
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

export {
  getPokemonDetails,
  getPokemonList,
  getAllPokemons
}