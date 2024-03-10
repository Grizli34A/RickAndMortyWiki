import { useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import CardBody from "../../Components/CardBody/CardBody";
import Pagination from "../../Components/PaginationCharacter/Pagination";
import {
  useCharacterStore,
  useFetchRequest,
  useFilterStore,
  useSearchStore,
} from "../../store";
import { windowUp } from "../../utils/utils";
import "./Characters.scss";
import Footer from "../../Components/Footer/Footer";
import Search from "../../Components/Search/Search";
import Filter from "../../Components/Filter/Filter";

const Characters = () => {
  const { getCharacters, characters, currentPage, setPageCount } =
    useCharacterStore();

  const { name } = useSearchStore();
  const { currentStatus, currentSpecies, currentGender } = useFilterStore();
  const { fetchSuccess, setFetchSuccess } = useFetchRequest();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios(
          process.env.REACT_APP_API_URL +
            `/character?page=${currentPage}&name=${name}&status=${currentStatus}&species=${currentSpecies}&gender=${currentGender}`
        );

        setFetchSuccess(true);
        windowUp();
        console.log(response.data);

        setTimeout(() => getCharacters(response.data.results), 500); //для эффекта плавной прокрутки, так как в ином случае рендер происходит быстрее скролла
        setPageCount(response.data.info.pages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchSuccess(false);
      }
    };
    getData();
  }, [currentPage, name, currentStatus, currentGender, currentSpecies]);

  return (
    <div className="characters">
      <Header />
      <Search />
      <div className="characters__body">
        <Filter />
        <CardBody characters={characters} />
      </div>
      {fetchSuccess && <Pagination />}

      <Footer />
    </div>
  );
};
export default Characters;
