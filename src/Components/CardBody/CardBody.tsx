import { FC } from "react";
import { ICharacter, useFetchRequest } from "../../store";
import Card from "../Card/Card";

interface ICardBody {
  selectValue?: string;
  characters: ICharacter[] | undefined;
}

const CardBody: FC<ICardBody> = ({ selectValue = "checked", characters }) => {
  const { fetchSuccess } = useFetchRequest();
  return (
    <>
      {fetchSuccess && selectValue && (
        <div className="characters__cards">
          {characters
            ? characters.map((character) => (
                <Card
                  key={character.id}
                  name={character.name}
                  gender={character.gender}
                  status={character.status}
                  type={character.type}
                  image={character.image}
                  species={character.species}
                  origin={character.origin}
                />
              ))
            : ""}
        </div>
      )}
      {!fetchSuccess && (
        <span className="characters__nodata">Нет резидентов</span>
      )}
    </>
  );
};

export default CardBody;
