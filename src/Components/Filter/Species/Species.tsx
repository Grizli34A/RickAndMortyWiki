import React from "react";
import { useCharacterStore, useFilterStore } from "../../../store";

const Species = () => {
  const { specieses, setSpecies, activeButtons, setActiveButtons } =
    useFilterStore();

  const { resetCurrentPage } = useCharacterStore();
  return (
    <>
      {specieses.map((species, index) => {
        return (
          <button
            key={index}
            className={activeButtons[2] === species ? "active" : ""}
            onClick={() => {
              setActiveButtons(2, species);
              setSpecies(species);
              resetCurrentPage();
            }}
          >
            {species}
          </button>
        );
      })}
    </>
  );
};

export default Species;
