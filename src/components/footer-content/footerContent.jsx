import { TbWorldWww } from "react-icons/tb";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import '../../styles/footer-content.css';


function FooterContent() {
  return (
    <div className="footer-content">
      <div className="footer-content-information">
        <p>Designed and Developed: Carlosdev90</p>
        <p>Contact Information: carlosdev90@gmail.com</p>
      </div>

      <div className="footer-content-icons">
        <a href="https://github.com/carlioso3000" target="_blank"><AiFillGithub /></a>
        <a href="https://www.linkedin.com/in/carlos-cabrera-323678113" target="_blank"><AiFillLinkedin /></a>
        <a href="https://github.com/carlioso3000" target="_blank"><TbWorldWww /></a>
      </div>
    </div>
  );
}

export default FooterContent;