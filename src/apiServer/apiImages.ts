import axios from "axios";
import { Response } from "../App";

axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

type Props = {};

export const getImages = async (
  query: string,
  page: number
): Promise<Response> => {
  const { data } = await axios.get(
    `search/photos?client_id=T-HC6VC4-ZNKhkxQ4b67SRRlfkzzJlFH2EwzvYYviAk&query=${query}&page=${page}`
  );
  return data;
};
