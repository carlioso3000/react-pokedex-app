// obtains good against types from pokeapi
async function getGoodAgainstTypes(pokemonTypes) {
  const goodAgainstTypes = [];
  const inmuneAgainst = [];
  for (const type of pokemonTypes) {
    const response = await fetch(type.url);
    const typeData = await response.json();

    const doubleDamageTo = typeData.damage_relations.double_damage_to;
    const halfDamageFrom = typeData.damage_relations.half_damage_from;
    for (const targetType of doubleDamageTo) {
      if (!goodAgainstTypes.includes(targetType.name)){
        goodAgainstTypes.push(targetType.name);
      }
    }
    for (const targetType of halfDamageFrom) {
      if (!goodAgainstTypes.includes(targetType.name)) {
        goodAgainstTypes.push(targetType.name);
      }
    }
    // it checks the inmunity of a pokemon against others based on its type
    const inmuneTo = typeData.damage_relations.no_damage_from;
    for ( const targetType of inmuneTo) {
      inmuneAgainst.push(targetType.name);
    }

  }
  return {
    goodAgainstTypes,
    inmuneAgainst
  };
}



//obtain bad against types from pokeapi
async function getBadAgainstTypes(pokemonTypes) {
  const badAgainstTypes = [];
  const uselessAgainst = [];
  for (const type of pokemonTypes) {
    const response = await fetch(type.url);
    const typeData = await response.json();
    const doubleDamageFrom = typeData.damage_relations.double_damage_from;
    const halfDamageTo = typeData.damage_relations.half_damage_to;
    for(const targetType of doubleDamageFrom) {
      badAgainstTypes.push(targetType.name);
    }
    for (const targetType of halfDamageTo) {
      badAgainstTypes.push(targetType.name);
    }
    // it checks if there are other pokemons inmune to this one
    const uselessTo = typeData.damage_relations.no_damage_to;
    for(const targetType of uselessTo) {
      uselessAgainst.push(targetType.name);
    }
  }
  return {
    badAgainstTypes,
    uselessAgainst
  };
}

export {
  getGoodAgainstTypes,
  getBadAgainstTypes
};