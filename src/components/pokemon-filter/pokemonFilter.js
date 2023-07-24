import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

// const options = [];
// for (let i = 10; i < 36; i++) {
//   options.push({
//     value: i.toString(36) + i,
//     label: i.toString(36) + i,
//   });
// }
const handleChange = (value) => {
  console.log(`Selected: ${value}`);
};

function PokemonFilter() {
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect (()=> {
    async function fetchPokemonTypes() {
      const response = await fetch('https://pokeapi.co/api/v2/type/');
      const data = await response.json();
      setSelectOptions(data.results.map(type => ({
        value: type.name,
        label: type.name,
      })));
    }
    fetchPokemonTypes();
  }, [])


  return (
    <>
      <Select
        size="large"
        placeholder="Select a type"
        onChange={handleChange}
        style={{
          width: 200,
        }}
        options={selectOptions}
      />
    </>
  )
}

export default PokemonFilter;