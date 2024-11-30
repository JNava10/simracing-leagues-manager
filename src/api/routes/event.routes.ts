// @ts-ignore
import * as express from "express";
import {validateToken} from "../middlewares/socketAuth";
import { ChampionshipController } from "../controllers/championship.controller";
import {EventController} from "../controllers/event.controller";

const router = express.Router();

const controller = EventController

router.post("/", [validateToken], controller.create);



export default router;