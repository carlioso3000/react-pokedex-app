

export async function getPokemonList(offset) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`);
    const pokemonList = await response.json();
    return pokemonList;
  } catch (error) {
    console.error(error);
    return null;
  }
}


console.log(getPokemonList)

export async function getPokemonDetails(pokemonList) {
  try {
    const promises = pokemonList.map(pokemon => fetch(pokemon.url).then(res => res.json()));
  const pokemonDetails = await Promise.all(promises);
  return pokemonDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
}