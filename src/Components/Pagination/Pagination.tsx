import React, { FC, useEffect, useState } from "react";
import { ICharacter } from "../../store";
import { windowUp } from "../../utils/utils";

interface IPagination {
  pageCount: number;
  residents: ICharacter[];
  setResidentsOnPage: (residentsSlice: ICharacter[]) => void;
}

const Pagination: FC<IPagination> = ({
  pageCount,
  residents,
  setResidentsOnPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => setCurrentPage(1), [pageCount]);

  const changedPage = (side: "next" | "prev") => {
    windowUp();
    if (side === "prev") {
      setCurrentPage(currentPage - 1);
      setResidentsOnPage(
        residents.slice((currentPage - 2) * 20, (currentPage - 1) * 20)
      );
    } else {
      setCurrentPage(currentPage + 1);
      setResidentsOnPage(
        residents.slice(currentPage * 20, (currentPage + 1) * 20)
      );
    }
  };
  return (
    <div className="characters__buttons">
      <button disabled={currentPage === 1} onClick={() => changedPage("prev")}>
        Назад
      </button>
      <span className="characters__buttons-pages">
        {currentPage} - {pageCount}
      </span>
      <button
        disabled={currentPage === pageCount}
        onClick={() => changedPage("next")}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;
