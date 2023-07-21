

export async function getPokemonList() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0/`);
    const listOfPokemon = await response.json();
    return listOfPokemon;
  } catch (error) {
    console.error(error);
    return null;
  }
}