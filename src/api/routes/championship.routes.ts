// @ts-ignore
import * as express from "express";
import {validateToken} from "../middlewares/auth.middleware";
import { ChampionshipController } from "../controllers/championship.controller";
import {isBanned} from "../middlewares/league.middleware";

const router = express.Router();

const controller = new ChampionshipController()

router.put("/preset/:championshipId", [validateToken], controller.edit);
router.get("/:championshipId/full", [validateToken], controller.getFullData);
router.get("/:championshipId/calendar", [validateToken], controller.getCalendar);
router.get("/:championshipId/entries", [validateToken], controller.getEntries);
router.get("/:championshipId/results", [validateToken], controller.getResults);

router.post("/", [validateToken], controller.create);
router.post("/:championshipId/enter", [validateToken], controller.enter);
router.post("/:championshipId/results/:round", [validateToken], controller.saveResults);
router.post("/:championshipId/results/:round/rfactor", [validateToken], controller.parseRfactorXml);

router.get("/teams/:championshipId", [validateToken], controller.getTeams);

router.get("/preset", [validateToken], controller.getAllPresets);
router.get("/preset/:id", [validateToken], controller.getPresetById);
router.post("/preset", [validateToken], controller.createPreset);

router.get("/:championshipId", [validateToken], controller.get);

export default router;