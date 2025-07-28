import axios from "axios";
import config from "../config/config";

export const getNowPlaying = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${config.tmdbApiKey}`,
        },
      }
    );
    return response.data; // Return only the data, not the whole response
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
