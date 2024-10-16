// @ts-ignore
import * as express from "express";
import { TrackController } from "../controllers/track.controller";


const controller = new TrackController()
const router = express.Router();

router.get("/", controller.getAll);
export default router;