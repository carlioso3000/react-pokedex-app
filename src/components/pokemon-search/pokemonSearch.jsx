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
          style= {{ width: '20%' }}
          onSearch={onSearch}
        />
  );
}

export default PokemonSearch;