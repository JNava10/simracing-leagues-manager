// @ts-ignore
import * as express from "express";
import {validateToken} from "../middlewares/auth.middleware";
import { ChampionshipController } from "../controllers/championship.controller";

const router = express.Router();

const controller = new ChampionshipController()

router.get("/:id", [validateToken], controller.get);
router.put("/preset/:id", [validateToken], controller.edit);
router.get("/:id/full", [validateToken], controller.getFullData);
router.get("/:id/calendar", [validateToken], controller.getCalendar);
router.get("/:id/entries", [validateToken], controller.getEntries);
router.get("/:id/results", [validateToken], controller.getResults);

router.post("/", [validateToken], controller.create);
router.post("/:id/enter", [validateToken], controller.enter);
router.post("/:id/results/:round", [validateToken], controller.saveResults);
router.post("/:id/results/:round/rfactor", [validateToken], controller.parseRfactorXml);

router.get("/teams/:champId", [validateToken], controller.getTeams);

router.get("/preset/:id", [validateToken], controller.getPresetById);
router.get("/preset", [validateToken], controller.getAllPresets);


export default router;