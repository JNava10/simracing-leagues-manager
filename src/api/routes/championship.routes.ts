// @ts-ignore
import * as express from "express";
import {validateToken} from "../middlewares/auth.middleware";
import { ChampionshipController } from "../controllers/championship.controller";

const router = express.Router();

const controller = new ChampionshipController()

router.post("/", [validateToken], controller.create);
router.post("/preset", [validateToken], controller.createPreset);

router.get("/preset", [validateToken], controller.getAllPresets);

export default router;