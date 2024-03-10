import React from "react";
import Status from "./Status/Status";
import Gender from "./Gender/Gender";
import Species from "./Species/Species";
import { useCharacterStore, useFilterStore } from "../../store";
import "./Filter.scss";
import Arrow from "./Arrow/Arrow";

const Filter = () => {
  const { setGender, setSpecies, setStatus, resetActiveButtons, filterOpened } =
    useFilterStore();

  const { resetCurrentPage } = useCharacterStore();
  const resetFilters = () => {
    setGender("");
    setSpecies("");
    setStatus("");
    resetActiveButtons();
    resetCurrentPage();
  };

  return (
    <div className="filter">
      <h2>Фильтры</h2>
      <button onClick={resetFilters}>Сбросить все фильтры</button>

      <div className="filter__status">
        <div className="filter__status-header">
          <h3>Статус</h3>
          <Arrow index={0} />
        </div>
        {filterOpened[0] && <Status />}
      </div>

      <div className="filter__species">
        <div className="filter__status-header">
          <h3>Вид</h3>
          <Arrow index={1} />
        </div>
        {filterOpened[1] && <Species />}
      </div>

      <div className="filter__gender">
        <div className="filter__status-header">
          <h3>Пол</h3>
          <Arrow index={2} />
        </div>
        {filterOpened[2] && <Gender />}
      </div>
    </div>
  );
};

export default Filter;
