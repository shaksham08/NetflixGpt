import { ApiError } from "../utils/ApiError";
import { getNowPlaying } from "../services/tmdbService";
import { Response, Request } from "express";

/**
 * Controller to get now playing movies from TMDB.
 */
export const nowPlaying = async (req: Request, res: Response) => {
  try {
    const data = await getNowPlaying();
    res.json({ data });
  } catch (error: unknown) {
    // Optionally log error here
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
