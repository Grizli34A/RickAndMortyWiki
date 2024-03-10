import React from "react";
import { useFilterStore, useCharacterStore } from "../../../store";
import { useState } from "react";

const Status = () => {
  const { statuses, setStatus, activeButtons, setActiveButtons } =
    useFilterStore();
  console.log(`status >>> ${activeButtons}`);
  const { resetCurrentPage } = useCharacterStore();
  return (
    <>
      {statuses.map((status, index) => {
        return (
          <button
            key={index}
            className={activeButtons[0] === status ? "active" : ""}
            onClick={() => {
              setActiveButtons(0, status);
              setStatus(status);
              resetCurrentPage();
            }}
          >
            {status}
          </button>
        );
      })}
    </>
  );
};

export default Status;
