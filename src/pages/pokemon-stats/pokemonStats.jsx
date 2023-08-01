import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokemonStats } from "../../utils/api"
import { getGoodAgainstTypes, getBadAgainstTypes } from '../../utils/utils.jsx';
import { Layout } from 'antd';
import HomePageButton from "../../components/homePageButton/homePageButton";
import PokemonSearch from '../../components/pokemon-search/pokemonSearch';
import NextPrevButton from '../../components/button/button.jsx';
import Chart from '../../components/chart/chart';
import './styles.css';

const {Header, Footer, Content } = Layout;

function PokemonStats() {
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState({
    name: "",
    id: 0,
    type: [],
    sprite: "",
    combatStats: {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0
    },
    evolutions: [],
    goodAgainst:[],
    badAgainst:[]
    
  })
  // recently added pokemonId as parameter to fetchData and value for const data
  async function fetchData(pokemonId) {
    const data = await getPokemonStats(searchedPokemon ||  pokemonId || id);
    const evolutionData = data.evolutionData; //to obtain evolutions
    const pokemonStats = data.pokemonStats; // obtain general stats

    const { goodAgainstTypes, inmuneAgainst } = await getGoodAgainstTypes(pokemonStats.types.map(t => t.type));
    const { badAgainstTypes, uselessAgainst } = await getBadAgainstTypes(pokemonStats.types.map(t => t.type));

    // const goodAgainstTypes = await getGoodAgainstTypes(pokemonStats.types.map(t => t.type));
    // const badAgainstTypes = await getBadAgainstTypes(pokemonStats.types.map(t => t.type));


    //lets find out if there is any evolution
    let evol;
if (evolutionData.chain.evolves_to.length > 0) {
  evol = evolutionData.chain;
}
const evolutions = [];
while (evol) {
  let id = evol.species.url.split("/")[6];
  
  evolutions.push({
    name:evol.species.name,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    id: id
  });

  evol = evol.evolves_to.length > 0 ? evol.evolves_to[0] : undefined;
}

    setPokemonData({
      name: pokemonStats.name,
      id: pokemonStats.id,
      type: pokemonStats.types.map(type => type.type.name),
      sprite: pokemonStats.sprites.other["official-artwork"].front_default,
      combatStats: {
        hp: pokemonStats.stats[0].base_stat,
        attack: pokemonStats.stats[1].base_stat,
        defense: pokemonStats.stats[2].base_stat,
        specialAttack: pokemonStats.stats[3].base_stat,
        specialDefense: pokemonStats.stats[4].base_stat,
        speed: pokemonStats.stats[5].base_stat
      },
      evolutions: evolutions,
      goodAgainst: goodAgainstTypes,
      inmuneAgainst: inmuneAgainst,
      badAgainst: badAgainstTypes
      
    });
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [searchedPokemon]);


  function getNextPokemon() {
    fetchData(pokemonData.id + 1);
  }
  
  function getPrevPokemon() {
    fetchData(pokemonData.id - 1);
  }
  
  

  return(
    <>
      <Layout>
        <Header className='header-style'><HomePageButton/></Header>

        <div className='button-container'>
          <NextPrevButton pokemonText={`#${pokemonData.id - 1}`}  text="Prev" nextButton={false} nextOrPrev={getPrevPokemon} />
          <NextPrevButton pokemonText={`#${pokemonData.id + 1}`} text="Next" nextButton={true} nextOrPrev={getNextPokemon} />
        </div>

        <PokemonSearch onSearch={setSearchedPokemon} />
        <Content className='content-style'>
            <div className='pokemon-container'>
              <h2>{pokemonData.name} #{pokemonData.id}</h2>
              <img
                src={pokemonData.sprite} 
                alt={pokemonData.name}
              />
              <div className='pokemon-evolutions'>
                <div className='evolution-chain-title'>
                  <h3>Evolutions</h3>
                </div>
                <ul>
                  {pokemonData.evolutions.map(evolution => (
                    <li key={evolution.name}>
                      <img src={evolution.img} alt={evolution.name} />
                      <div>
                        <p>{evolution.name}</p>
                        <p>#{evolution.id}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='stats-container'>
              <h3>STATS</h3>
              <Chart stats={pokemonData.combatStats} />
              <div className='pokemon-types'>
                <div className='pokemon-types-types'>
                  <h3>Types</h3>
                  
                </div>
                <div className='pokemon-types-strengths'>
                  <h3>Strengths</h3>
                </div>
                <div className='pokemon-types-weaknesses'>
                  <h3>Weaknesses</h3>
                </div>
              </div>
            </div>
          </Content>
        <Footer className='footer-style'>Footer</Footer>
      </Layout>
    </>
  )

}

export default PokemonStats;