import { TbWorldWww } from "react-icons/tb";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import '../../styles/footer-content.css';
import pokeball from '../../assets/pokeball.png';


function FooterContent() {
  return (
    <div className="footer-content">
      <div className="footer-content-information">
        <h4>Pokedex</h4>
        <div className="image-container">
          <img alt="pokeball" src={pokeball} />
          <div className="line1"></div>
          <div className="line2"></div>
        </div>
        <p>Designed and Developed: Carlosdev90</p>
        <p>Contact Information: Carlosdev90@gmail.com</p>
        <div className="footer-content-icons">
        <a href="https://github.com/carlioso3000" target="_blank" rel="noreferrer noopener"><AiFillGithub /></a>
        <a href="https://www.linkedin.com/in/carlos-cabrera-323678113" target="_blank" rel="noreferrer noopener"><AiFillLinkedin /></a>
        <a href="https://github.com/carlioso3000" target="_blank" rel="noreferrer noopener"><TbWorldWww /></a>
      </div>
      </div>

      
    </div>
  );
}

export default FooterContent;