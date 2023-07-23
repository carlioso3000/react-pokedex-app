import { Layout } from 'antd';
import './styles.css'
import PokemonList from '../../components/pokemon-list/pokemonList.jsx';
import PokemonSearch from '../../components/pokemon-search/pokemonSearch.jsx';

const { Header, Footer, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
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
  return (

    <Layout>
      <Header style={headerStyle}></Header>
        <PokemonSearch />
        <Content style={contentStyle}><PokemonList /></Content>
        
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
    
  )
}

export default HomePage;