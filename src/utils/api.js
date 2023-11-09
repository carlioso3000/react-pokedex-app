// It provides a list of all pokemons
async function getAllPokemons() {
  // Intenta obtener los datos del localStorage
  const cachedData = localStorage.getItem("allPokemons");
  if (cachedData) {
    // Si los datos están en el localStorage, úsalos
    return JSON.parse(cachedData);
  } else {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=1300&offset=0`
      );
      const allPokemonList = await response.json();

      // Guarda los datos en el localStorage para su uso futuro
      localStorage.setItem("allPokemons", JSON.stringify(allPokemonList));

      return allPokemonList;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
//Provee la lista de 50 pokemons por pagina
async function getPokemonList(offset) {
  const cacheData = localStorage.getItem(`pokemonList_${offset}`);
  if (cacheData) {
    // Si los datos están en el localStorage,agarralos de ahí
    return JSON.parse(cacheData);
  } else {
    //si no están entonces haz el fetch
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=50&offset=${offset}`
      );
      const pokemonList = await response.json();
      // Guarda los datos en el localStorage para su uso futuro
      localStorage.setItem(
        `pokemonList_${offset}`,
        JSON.stringify(pokemonList)
      );
      return pokemonList;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
// it provides pokemon details
async function getPokemonDetails(pokemonList) {
  try {
    const promises = pokemonList.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json())
    );
    const results = await Promise.allSettled(promises);
    const pokemonDetails = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
    return pokemonDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
}
//it provides pokemon filtered per types
async function getPokemonPerType(type) {
  // intenta encontrar la info en local storage, si está la retorna, si no, hace el fetch
  const cacheData = localStorage.getItem(`pokemonPerType_${type}`);
  if (cacheData) {
    return JSON.parse(cacheData);
  } else {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      const promises = data.pokemon.map(async ({ pokemon }) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonResponse.json();
        return {
          name: pokemonDetails.name,
          sprite:
            pokemonDetails.sprites.other["official-artwork"].front_default,
          type: pokemonDetails.types.map((type) => type.type.name),
          id: pokemonDetails.id,
        };
      });
      const results = await Promise.allSettled(promises);
      const pokemonData = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);
      // Guarda los datos en el localStorage para su uso futuro
      localStorage.setItem(
        `pokemonPerType_${type}`,
        JSON.stringify(pokemonData)
      );
      return pokemonData;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
//it provides pokemon stats for PokemonStats Page
async function getPokemonStats(pokemon) {
  try {
    const isId = !isNaN(pokemon);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${
        isId ? pokemon : pokemon.toLowerCase()
      }/`
    );
    const pokemonStats = await response.json();
    // here i will obtain evolution information for the pokemon that is being shown
    const responseForEvolutions = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${
        isId ? pokemon : pokemon.toLowerCase()
      }/`
    );
    const speciesData = await responseForEvolutions.json();
    const evolutionUrl = speciesData.evolution_chain.url;
    const evolutionRes = await fetch(evolutionUrl);
    const evolutionData = await evolutionRes.json();
    return { evolutionData, pokemonStats };
  } catch (error) {
    console.error(error);
    return null;
  }
}
// it only provides pokemon types to show type tags
async function fetchPokemonTypes() {
  const response = await fetch("https://pokeapi.co/api/v2/type/");
  const data = await response.json();
  return data.results.map((type) => ({
    value: type.name,
    label: type.name,
  }));
}
export {
  getPokemonDetails,
  getPokemonList,
  getAllPokemons,
  getPokemonStats,
  getPokemonPerType,
  fetchPokemonTypes,
};
