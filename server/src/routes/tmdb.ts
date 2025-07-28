import { nowPlaying } from "../controllers/tmdbController";
import { Router } from "express";

const tmdbRouter = Router();

tmdbRouter.get("/now-playing", nowPlaying);

export default tmdbRouter;
