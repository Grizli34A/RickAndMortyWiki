import React from "react";
import { useFilterStore, useCharacterStore } from "../../../store";
const Gender = () => {
  const { genders, setGender, activeButtons, setActiveButtons } =
    useFilterStore();

  const { resetCurrentPage } = useCharacterStore();
  return (
    <>
      {genders.map((gender, index) => {
        return (
          <button
            key={index}
            className={activeButtons[1] === gender ? "active" : ""}
            onClick={() => {
              setActiveButtons(1, gender);
              setGender(gender);
              resetCurrentPage();
            }}
          >
            {gender}
          </button>
        );
      })}
    </>
  );
};

export default Gender;
