// @ts-ignore
import * as express from "express";
import {validateToken} from "../middlewares/auth.middleware";
import { ChampionshipController } from "../controllers/championship.controller";

const router = express.Router();

const controller = new ChampionshipController()

router.get("/:id", [validateToken], controller.get);
router.post("/", [validateToken], controller.create);
router.post("/:id/enter", [validateToken], controller.enter);

router.get("/teams/:champId", [validateToken], controller.getTeams);

router.post("/preset", [validateToken], controller.createPreset);
router.get("/preset/:id", [validateToken], controller.getPresetById);
router.get("/preset", [validateToken], controller.getAllPresets);


export default router;