import { Input } from 'antd';
import '../../styles/pokemon-search.css';
import React from 'react';

const { Search } = Input;

function PokemonSearch(props) {
  const onSearch = (value) => {
    props.onSearch(value);
  };
  

  return (
      
        <Search
          placeholder="type a pokemon name"
          allowClear
          enterButton="Search"
          size="middle"
          onSearch={onSearch}
        />
  );
}

export default PokemonSearch;