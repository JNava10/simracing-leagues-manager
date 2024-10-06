// @ts-ignore
import * as express from "express";
import { TrackController } from "../controllers/track.controller";


const controller = new TrackController()
const router = express.Router();

router.get("/", controller.getAll);
router.get("/search", controller.search);
router.get("/layout/search", controller.searchLayouts);

export default router;