import { Button} from 'antd';

function NextPrevButton({ text, nextButton, nextOrPrev }) {
  return (
    <Button 
      className={nextButton ? "next-button" : "prev-button"}
      onClick={nextOrPrev}
      type="primary" 
      block
      >
      {text}
    </Button>
  )
}

export default NextPrevButton;