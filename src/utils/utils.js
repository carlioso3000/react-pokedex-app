// obtains good against types from pokeapi
async function getGoodAgainstTypes(pokemonTypes) {
  const goodAgainstTypes = [];
  const inmuneAgainst = [];
  for (const type of pokemonTypes) {
    const response = await fetch(type.url);
    const typeData = await response.json();
    console.log(typeData);
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
  const badAgainstTypes = new Set();
  const uselessAgainst = new Set();
  for (const type of pokemonTypes) {
    const response = await fetch(type.url);
    const typeData = await response.json();
    const doubleDamageFrom = typeData.damage_relations.double_damage_from;
    const halfDamageTo = typeData.damage_relations.half_damage_to;
    for (const targetType of doubleDamageFrom) {
      badAgainstTypes.add(targetType.name);
    }
    for (const targetType of halfDamageTo) {
      badAgainstTypes.add(targetType.name);
    }
    // it checks if there are other pokemons inmune to this one
    const uselessTo = typeData.damage_relations.no_damage_to;
    for (const targetType of uselessTo) {
      uselessAgainst.add(targetType.name);
    }
  }
  return {
    badAgainstTypes: Array.from(badAgainstTypes),
    uselessAgainst: Array.from(uselessAgainst)
  };
}

export {
  getGoodAgainstTypes,
  getBadAgainstTypes
};