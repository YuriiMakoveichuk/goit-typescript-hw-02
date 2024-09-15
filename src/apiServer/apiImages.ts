import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(
    `search/photos?client_id=T-HC6VC4-ZNKhkxQ4b67SRRlfkzzJlFH2EwzvYYviAk&query=${query}&page=${page}`
  );
  return data;
};
