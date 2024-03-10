import { ILocation, IEpisode, useFetchRequest } from "../store";
import { useLocationStore, useEpisodeStore } from "../store";
import useResidents from "./useResidents";
import { isArrayOfStrings } from "../utils/utils";

const useCharacterId = (): ((
  collection: (ILocation | IEpisode)[],
  selectValue: string
) => void) => {
  const { setCurrentLocation } = useLocationStore();
  const { setCurrentEpisode } = useEpisodeStore();
  const { setFetchSuccess } = useFetchRequest();
  const getResidents = useResidents();

  const getUsersId = (
    collection: (ILocation | IEpisode)[],
    selectValue: string
  ) => {
    const currentCollection = collection.find(
      (elem: ILocation | IEpisode | undefined) => elem?.name === selectValue
    );
    if (currentCollection) {
      let idResidents: (string | undefined)[] = [];
      if ("residents" in currentCollection) {
        setCurrentLocation(currentCollection);
        idResidents = [...currentCollection?.residents].map((resident) => {
          const regex = /\d+(?![\d\D])/;
          const numbers = resident.match(regex);
          return numbers?.[0];
        });
      } else if ("characters" in currentCollection) {
        setCurrentEpisode(currentCollection);
        idResidents = [...currentCollection?.characters].map((resident) => {
          const regex = /\d+(?![\d\D])/;
          const numbers = resident.match(regex);
          return numbers?.[0];
        });
      }
      if (idResidents.length === 0) setFetchSuccess(false);

      if (isArrayOfStrings(idResidents) && idResidents.length > 0) {
        getResidents(idResidents);
        setFetchSuccess(true);
      }
    }
  };
  return getUsersId;
};
export default useCharacterId;
