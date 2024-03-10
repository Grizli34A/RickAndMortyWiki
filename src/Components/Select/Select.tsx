import React, { FC } from "react";
import { ILocation, IEpisode } from "../../store";

interface ISelect {
  selectValue: string;
  selectOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  collection: (ILocation | IEpisode)[];
}
const Select: FC<ISelect> = ({ selectValue, selectOnChange, collection }) => {
  return (
    <select value={selectValue} onChange={(event) => selectOnChange(event)}>
      <option value="" disabled>
        Select variant
      </option>
      {collection.map((item) => {
        return <option key={item.id}>{item.name}</option>;
      })}
    </select>
  );
};

export default Select;
