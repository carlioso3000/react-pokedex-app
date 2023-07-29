import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokemonStats } from "../../utils/api"
import { getGoodAgainstTypes, getBadAgainstTypes } from '../../utils/utils.jsx';
import { Layout } from 'antd';
import HomePageButton from "../../components/homePageButton/homePageButton";


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


function PokemonStats() {
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
    badAgainst:[],
    
  })

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonStats(id);
      const evolutionData = data.evolutionData; //to obtain evolutions
      const pokemonStats = data.pokemonStats; // obtain general stats

      const goodAgainstTypes = await getGoodAgainstTypes(pokemonStats.types.map(t => t.type));
      const badAgainstTypes = await getBadAgainstTypes(pokemonStats.types.map(t => t.type));


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
        evolutions: evolutionData.evolutions,
        goodAgainst: goodAgainstTypes,
        badAgainst: badAgainstTypes
      });
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log(pokemonData.goodAgainst);
    console.log(pokemonData.badAgainst);
  }, [pokemonData.goodAgainst, pokemonData.badAgainst]);
  


  return(
    <>
      <Layout>
        <Header style={headerStyle}><HomePageButton/></Header>
        <Content style={contentStyle}>
            <img
              src={pokemonData.sprite} 
              alt={pokemonData.name}

              style={{ width: "200px", height:"200px"}}
            />
          </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </>
  )
}

export default PokemonStats;