// @ts-ignore
import * as express from "express";
import * as controller from "../controllers/track.controller";

const router = express.Router();

router.get("/", controller.getAllTracks);

export default router;