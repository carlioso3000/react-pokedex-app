import React, { useState, useEffect } from "react";
import "../../styles/drop-down-filter.css";
import { Select } from "antd";
import { fetchPokemonTypes } from "../../utils/api";

function PokemonFilter({ onSelectType }) {
  // handles the dropdown component to show all pokemon types from the api
  const [selectOptions, setSelectOptions] = useState([]);

  const handleChange = (value) => {
    if (value === "none") {
      onSelectType(null);
    } else {
      onSelectType(value);
    }
  };

  useEffect(() => {
    async function getPokemonTypes() {
      const types = await fetchPokemonTypes();
      setSelectOptions(types);
    }
    getPokemonTypes();
  }, []);
  return (
    <>
      <Select
        placeholder="Select a type"
        onChange={handleChange}
        options={[{ value: "none", label: "none" }, ...selectOptions]}
      />
    </>
  );
}
export default PokemonFilter;
