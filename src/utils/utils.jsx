// obtains good against types from pokeapi
async function getGoodAgainstTypes(pokemonTypes) {
  const goodAgainstTypes = [];
  for (const type of pokemonTypes) {
    const response = await fetch(type.url);
    const typeData = await response.json();
    const doubleDamageTo = typeData.damage_relations.double_damage_to;
    const halfDamageFrom = typeData.damage_relations.half_damage_from;
    for (const targetType of doubleDamageTo) {
      goodAgainstTypes.push(targetType.name);
    }
    for (const targetType of halfDamageFrom) {
      goodAgainstTypes.push(targetType.name);
    }
  }
  return goodAgainstTypes;
}



//obtain bad against types from pokeapi
async function getBadAgainstTypes(pokemonTypes) {
  const badAgainstTypes = [];
  for (const type of pokemonTypes) {
    const response = await fetch(type.url);
    const typeData = await response.json();
    const doubleDamageFrom = typeData.damage_relations.double_damage_from;
    const halfDamageTo = typeData.damage_relations.half_damage_to;
    for(const targetType of doubleDamageFrom) {
      badAgainstTypes.push(targetType.name)
    }
    for (const targetType of halfDamageTo) {
      badAgainstTypes.push(targetType.name);
    }
  }
  return badAgainstTypes;
}

export {
  getGoodAgainstTypes,
  getBadAgainstTypes
}