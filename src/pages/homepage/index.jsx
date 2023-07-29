import { useState } from 'react';
import { Layout } from 'antd';
import './styles.css'
import pokeball from '../../assets/pokeball.png';
import PokemonList from '../../components/pokemon-list/defaultPokemonList.jsx';
import PokemonSearch from '../../components/pokemon-search/pokemonSearch.jsx';
import PokemonFilter from '../../components/droptDown-filter/dropDownFilter';
import FilteredPokemonList from '../../components/filtered-pokemon-list/filteredPokemonList';
import SearchedPokemonList from '../../components/searched-pokemon-list/searchedPokemonList';
import HomePageButton from '../../components/homePageButton/homePageButton';

const { Header, Footer, Content } = Layout;
const headerStyle = {
  textAlign: 'start',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#e5e5e5',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};


function HomePage () {
  const [selectedType, setSelectedType] = useState(null);
  const [searchedPokemon, setSearchedPokemon] = useState(null);


  return (

    <Layout>
      <Header style={headerStyle}><HomePageButton/></Header>
        <PokemonFilter 
          onSelectType={setSelectedType} 
        />

        <PokemonSearch 
          onSearch={setSearchedPokemon}
        />

        <Content 
          style={contentStyle}>
          {selectedType ? (
    <FilteredPokemonList selectedType={selectedType} />
  ) : searchedPokemon ? ( 
    <SearchedPokemonList searchedPokemon={searchedPokemon} />
    ) :
  (
    <PokemonList />
  )}
        </Content>
        
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
    
  )
}

export default HomePage;