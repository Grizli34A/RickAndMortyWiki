import { FC, useRef, useState } from "react";
import { Gender, Status, Species } from "../../app.types";
import "./Card.scss";

interface IOrigin {
  name: string;
  url: string;
}

interface ICard {
  name: string;
  gender: Gender;
  status: Status;
  type: string;
  image: string;
  species: Species;
  origin?: IOrigin;
  location?: Location;
  episode?: string[];
}

const Card: FC<ICard> = ({
  name,
  gender,
  status,
  type,
  image,
  species,
  origin,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const classStatus = `card__status ${status?.toLowerCase()}`;

  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={cardRef}
    >
      <h1>{name}</h1>
      <img src={image} alt={name}></img>
      <span className={classStatus}>{status}</span>
      {isHovered && (
        <div className={"card__info"}>
          <p>Пол: {gender} </p>
          {type && <p>Тип: {type} </p>}
          <p>Вид: {species} </p>
          <p>Место рождения: {origin?.name}</p>
        </div>
      )}
    </div>
  );
};
export default Card;
