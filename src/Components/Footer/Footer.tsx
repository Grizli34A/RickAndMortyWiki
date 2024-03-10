import { useFetchRequest } from "../../store";
import telegram from "../../image/telegram.svg";
import vk from "../../image/vk.svg";
import github from "../../image/github.svg";
import { HandySvg } from "handy-svg";
import "./Footer.scss";

const Footer = () => {
  const { fetchSuccess } = useFetchRequest();
  return (
    <footer className={fetchSuccess ? "" : "nodata"}>
      <h2>RickAndMorty Wiki</h2>
      <div className="footer__socialNetworks">
        <a href="https://vk.com/confucius3">
          <HandySvg src={vk} width="30" height="30" />
        </a>
        <a href="https://github.com/Grizli34A">
          <HandySvg src={github} width="30" height="30" />
        </a>
        <a href="https://t.me/confucius3">
          <HandySvg src={telegram} width="30" height="30" />
        </a>
      </div>
      <p>March, 2024</p>
    </footer>
  );
};
export default Footer;
