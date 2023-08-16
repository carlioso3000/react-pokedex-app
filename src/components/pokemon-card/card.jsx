import { useNavigate } from 'react-router-dom';
import { Card, Tag, Typography } from 'antd';
import '../../styles/pokemon-card.css';
const { Title } = Typography;

const typeColors = {
  bug: '#729F3F',
  dark: '#707070',
  dragon: '#F16E57',
  electric: '#EED535',
  fairy: '#FDB9E9',
  fighting: '#D56723',
  fire: '#FD7D24',
  flying: '#BDB9B8',
  ghost: '#7B62A3',
  grass: '#9BCC50',
  ground: '#AB9842',
  ice: '#50C3E7',
  normal: '#A4ACAF',
  poison: '#B87FC8',
  psychic: '#F366B9',
  rock: '#A38C21',
  shadow: '#729F3F',
  steel: '#9EB7B8',
  water: '#4592C4'
};

function CardPokemon({ pokemonName, pokemonImage, pokemonType, pokemonId }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/pokemon-stats/${pokemonId}`);
  }

  return (


<Card
      cover={<img onClick={handleClick} alt={pokemonName} src={pokemonImage} />}
    >
      <Title level={5}>#{pokemonId} <br></br> {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</Title>
      <div style={{ display:'flex', width:'100%'}}>
      {pokemonType.map(t => (
        <Tag key={t} width={100} color={typeColors[t]} style={{ flex: 1, textAlign: 'center' }}>{t}</Tag>
      ))}
      </div>
    </Card>
  );
}

export default CardPokemon;
