import axios from "axios";

// get the list of popular movies
export const getMovieDetails = async () => {
  try {
    const response = axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );
    console.log(response);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
