import React from "react";
import { useCharacterStore, useSearchStore } from "../../store";
import "./Search.scss";

const Search = () => {
  const { name, setName } = useSearchStore();
  const { resetCurrentPage } = useCharacterStore();

  return (
    <div className="search">
      <span>Поиск персонажа</span>
      <input
        id="search__input"
        placeholder="Input character name"
        onChange={(e) => {
          setName(e);
          resetCurrentPage();
        }}
        value={name}
      />
    </div>
  );
};

export default Search;
