import axios from "axios";
import { getPages } from "../utils/utils";
import { useEpisodeStore, useLocationStore } from "../store";

const useCollection = (): ((requestType: string) => void) => {
  const { setEpisodes } = useEpisodeStore();
  const { setLocations } = useLocationStore();
  const getCollection = async (requestType: string) => {
    const pages: number = await getPages(requestType);
    const collection = [];
    let page = 1;
    do {
      const response = await axios(
        process.env.REACT_APP_API_URL + `/${requestType}?page=${page}`
      );
      collection.push(...response.data.results);
    } while (++page - 1 < pages);
    if (requestType === "location") setLocations(collection);
    if (requestType === "episode") setEpisodes(collection);
  };
  return getCollection;
};

export default useCollection;
