import { useEffect, useState } from "react";
import { ICharacter, useEpisodeStore, useCharacterStore } from "../../store";

import { objIntoArray } from "../../utils/utils";

import useCollection from "../../Hooks/useCollection";
import useCharacterId from "../../Hooks/useCharacterId";

import Select from "../../Components/Select/Select";
import Header from "../../Components/Header/Header";
import CardBody from "../../Components/CardBody/CardBody";
import Pagination from "../../Components/Pagination/Pagination";
import "./Episodes.scss";

const Episodes = () => {
  const [selectValue, setSelectValue] = useState("");
  const [residentsOnPage, setResidentsOnPage] = useState<
    ICharacter[] | undefined
  >();
  const { episodes, currentEpisode } = useEpisodeStore();
  const { characters } = useCharacterStore();
  const getEpisodes = useCollection();
  const getEpisodesId = useCharacterId();

  const residents = objIntoArray(characters);

  useEffect(() => {
    if (residents && residents?.length > 20)
      setResidentsOnPage(residents.slice(0, 20));
    else setResidentsOnPage(residents);
  }, [residents]);

  useEffect(() => {
    getEpisodes("episode");
  }, []);

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getEpisodesId(episodes, e.target.value);
    setSelectValue(e.target.value);
  };

  return (
    <>
      <Header />
      {currentEpisode && (
        <>
          <h2>
            Release date -{" "}
            <span className="episode__release">{currentEpisode.air_date}</span>
          </h2>
          <h2>Episode - {currentEpisode.episode}</h2>
        </>
      )}
      <h3>Выберите эпизод</h3>
      <Select
        selectValue={selectValue}
        selectOnChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          selectOnChange(event)
        }
        collection={episodes}
      />

      <CardBody selectValue={selectValue} characters={residentsOnPage} />
      {residents && residents?.length > 20 && (
        <Pagination
          pageCount={Math.ceil(residents.length / 20)}
          residents={residents}
          setResidentsOnPage={(residentsSlice) =>
            setResidentsOnPage(residentsSlice)
          }
        />
      )}
    </>
  );
};
export default Episodes;
