import axios from "axios";
import { ICharacter } from "../store";

export const isArrayOfStrings = (arr: unknown): arr is string[] => {
  return Array.isArray(arr) && arr.every((item) => typeof item === "string");
};

export const getPages = async (type: string) => {
  const response = await axios(process.env.REACT_APP_API_URL + `/${type}`);
  return response.data.info.pages;
};

export const objIntoArray = (obj: ICharacter[]) => {
  if (obj) {
    if (!Array.isArray(obj)) return [obj];
    return obj;
  }
};

export const windowUp = () => {
  console.log("windowUp");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
export const extractId = (str: string) => {};
