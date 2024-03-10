import { NavLink } from "react-router-dom";
import {
  useLocationStore,
  useEpisodeStore,
  useCharacterStore,
  useFetchRequest,
} from "../../store";
import "./Header.scss";
const Header = () => {
  const { setCurrentLocation } = useLocationStore();
  const { setCurrentEpisode } = useEpisodeStore();
  const { resetCharacters } = useCharacterStore();
  const { setFetchSuccess } = useFetchRequest();
  const resetTitles = () => {
    setCurrentLocation("");
    setCurrentEpisode("");
    resetCharacters();
    setFetchSuccess(true);
  };
  return (
    <header className="header__menu">
      <NavLink to={"/"} className="header__nav-link">
        Герои
      </NavLink>
      <NavLink
        to={"/locations"}
        className={"header__nav-link"}
        onClick={resetTitles}
      >
        Локации
      </NavLink>
      <NavLink
        to={"/episodes"}
        className={"header__nav-link"}
        onClick={resetTitles}
      >
        Эпизоды
      </NavLink>
    </header>
  );
};

export default Header;
