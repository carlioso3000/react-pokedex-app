import { useNavigate } from 'react-router-dom';
import pokeball from '../../assets/pokeball.png';


function HomePageButton() {
  const navigate = useNavigate();
  const buttonStyle = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  };
  const imgStyle = {
    width: "60px", 
    height: "60px"
  };


  function handleCLick() {
    window.location.assign("/");
  }

  return(
    <>
      <button onClick={handleCLick} style={buttonStyle}>
        <img src={pokeball} alt='pokeball-button' style={imgStyle}/>
      </button>
      <h1 onClick={handleCLick}>Pokedex</h1>
    </>
  );
}

export default HomePageButton;