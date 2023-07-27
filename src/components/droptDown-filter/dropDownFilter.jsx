import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

function PokemonFilter({ onSelectType }) {
  // handles the dropdown component to show all pokemon types from the api
  const [selectOptions, setSelectOptions] = useState([]);
  
  const handleChange = (value) => {
    onSelectType(value);
  };

  useEffect (()=> {
    async function fetchPokemonTypes() {
      const response = await fetch('https://pokeapi.co/api/v2/type/'); // only pokemon types endpoint
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