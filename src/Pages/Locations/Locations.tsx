import { useEffect, useState } from "react";
import { ICharacter, useCharacterStore, useLocationStore } from "../../store";

import { objIntoArray } from "../../utils/utils";

import useCollection from "../../Hooks/useCollection";
import useCharacterId from "../../Hooks/useCharacterId";

import Select from "../../Components/Select/Select";
import CardBody from "../../Components/CardBody/CardBody";
import Header from "../../Components/Header/Header";
import Pagination from "../../Components/Pagination/Pagination";
import Footer from "../../Components/Footer/Footer";
import "./Locations.scss";

const Locations = () => {
  console.log("locations render");

  const [selectValue, setSelectValue] = useState("");
  const [residentsOnPage, setResidentsOnPage] = useState<
    ICharacter[] | undefined
  >();
  const { locations, currentLocation } = useLocationStore();
  const { characters } = useCharacterStore();
  const getLocations = useCollection();
  const getLocationsId = useCharacterId();

  const residents = objIntoArray(characters);
  console.log(residents);
  console.log(residentsOnPage);
  console.log("render");

  useEffect(() => {
    if (residents && residents?.length > 20)
      setResidentsOnPage(residents.slice(0, 20));
    else setResidentsOnPage(residents);
  }, [residents]);

  useEffect(() => {
    getLocations("location");
  }, []);

  const selectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    getLocationsId(locations, e.target.value);
    setSelectValue(e.target.value);
  };

  return (
    <>
      <Header />
      {currentLocation && (
        <>
          <h2>Type - {currentLocation.type}</h2>
          <h2>Dimension - {currentLocation.dimension}</h2>
        </>
      )}
      <h3>Выберите локацию</h3>
      <Select
        selectValue={selectValue}
        selectOnChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          selectOnChange(event)
        }
        collection={locations}
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
export default Locations;
