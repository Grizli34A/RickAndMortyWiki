import React from "react";
import { useCharacterStore } from "../../store";
import "./Pagination.scss";

const Pagination = () => {
  const { pageCount, nextCharaters, prevCharacters, currentPage, changePath } =
    useCharacterStore();
  const getCollection = (isNext: boolean) => {
    changePath(isNext);
  };
  return (
    <div className="characters__buttons">
      <button disabled={!prevCharacters} onClick={() => getCollection(false)}>
        Назад
      </button>
      <span className="characters__buttons-pages">
        {currentPage} - {pageCount}
      </span>
      <button disabled={!nextCharaters} onClick={() => getCollection(true)}>
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
