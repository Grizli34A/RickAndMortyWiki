import React from "react";
import { useState, FC } from "react";
import { useFilterStore } from "../../../store";
import "./Arrow.scss";

interface IArrow {
  index: number;
}
const Arrow: FC<IArrow> = ({ index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setFilterOpened } = useFilterStore();

  const arrowClick = () => {
    setIsOpen(!isOpen);
    setFilterOpened(index);
  };
  return (
    <a className={`arrowIcon ${isOpen ? "open" : ""}`} onClick={arrowClick}>
      <span className="leftBar"></span>
      <span className="rightBar"></span>
    </a>
  );
};

export default Arrow;
