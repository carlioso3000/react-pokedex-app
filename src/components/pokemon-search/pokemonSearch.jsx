import { Input, Space } from 'antd';
import React from 'react';
const { Search } = Input;

const onSearch = (value) => console.log(value);
function PokemonSearch() {
  return (
      <Search
      placeholder="type a pokemon name"
      allowClear
      enterButton="Search"
      size="middle"
      style= {{ width: "40%"}}
      onSearch={onSearch}
    />
  )
}

export default PokemonSearch;