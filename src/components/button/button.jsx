import { Button} from 'antd';

function NextPrevButton({ pokemonText, text, nextButton, nextOrPrev }) {
  return (
    <Button 
      className={nextButton ? "next-button" : "prev-button"}
      onClick={nextOrPrev}
      type="primary" 
      block
      >
      {text}
      {pokemonText}
    </Button>
  )
}

export default NextPrevButton;