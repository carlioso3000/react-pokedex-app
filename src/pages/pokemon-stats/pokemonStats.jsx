import { useState } from 'react';
import { getPokemonStats } from "../../utils/api"
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
  const [pokemonStats, setPokemonStats] = useState({
    name: "",
    id: 0,
    type: [],
    sprite: "",
    evolutions: [],
    goodAgainst:[],
    badAgainst:[],
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0
    }

  })



  return(
    <>
      <Layout>
        <Header style={headerStyle}><HomePageButton/></Header>
        <Content style={contentStyle}>Content</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </>
  )
}

export default PokemonStats;