import { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { headerStyle, contentStyle, footerStyle } from '../../styles/layoutStyles';
import './styles.css';
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

  // useEffect(() => {
  //   // Restablece el estado de los filtros cuando el componente se monta
  //   setSelectedType(null);
  //   setSearchedPokemon(null);
  // }, []);


  return (

    <Layout>
      <Header style={headerStyle}>
        <HomePageButton/>
        <div className="header-title">
          <h3>Search for a pokemon by name or select a type to show a list of pokemons</h3>
        </div>
      </Header>
        <div className='filter-and-searcher-container'>
          
          

          <PokemonSearch 
            onSearch={setSearchedPokemon}
          />
          <PokemonFilter 
            onSelectType={setSelectedType} 
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