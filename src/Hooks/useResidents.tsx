import axios from "axios";
import { useCharacterStore } from "../store";

const useResidents = (): ((idResidents: string[]) => void) => {
  const { getCharacters } = useCharacterStore();

  const getResidents = async (idResidents: string[]) => {
    try {
      const response = await axios(
        process.env.REACT_APP_API_URL + `/character/${idResidents}`
      );
      if (!Array.isArray(response.data)) {
        const resident = [response.data];
        getCharacters(resident);
      }
      getCharacters(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return getResidents;
};

export default useResidents;
