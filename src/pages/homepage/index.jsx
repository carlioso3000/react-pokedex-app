import { useState } from 'react';
import { Layout } from 'antd';
import { headerStyle, contentStyle, footerStyle } from '../../styles/layoutStyles';
import './styles.css';
import pokeball from '../../assets/pokeball.png';
import PokemonList from '../../components/pokemon-list/defaultPokemonList.jsx';
import PokemonSearch from '../../components/pokemon-search/pokemonSearch.jsx';
import PokemonFilter from '../../components/droptDown-filter/dropDownFilter';
import FilteredPokemonList from '../../components/filtered-pokemon-list/filteredPokemonList';
import SearchedPokemonList from '../../components/searched-pokemon-list/searchedPokemonList';
import HomePageButton from '../../components/homePageButton/homePageButton';
import FooterContent from '../../components/footer-content/footerContent';

const { Header, Footer, Content } = Layout;

function HomePage () {
  const [selectedType, setSelectedType] = useState(null);
  const [searchedPokemon, setSearchedPokemon] = useState(null);


  return (

    <Layout>
      <Header style={headerStyle}>
        <HomePageButton/>
      </Header>
        <div className='filter-and-searcher-container'>
          <h3>Search for a pokemon by name or select a type to show a list of pokemons</h3>
          <PokemonFilter 
            onSelectType={setSelectedType} 
          />

          <PokemonSearch 
            onSearch={setSearchedPokemon}
          />
        </div>

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
        
      <Footer style={footerStyle}><FooterContent /></Footer>
    </Layout>
    
  );
}

export default HomePage;