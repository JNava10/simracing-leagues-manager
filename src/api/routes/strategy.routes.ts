// @ts-ignore
import * as express from "express";
import {validateToken} from "../middlewares/socketAuth";
import {banMember} from "../controllers/league.controller";
import {isBanned} from "../middlewares/league.middleware";
import {StrategyController} from "../controllers/strategy.controller";

const router = express.Router();
const controller = StrategyController
/**
 * @route POST /
 * @description Crear una nueva liga
 */
router.post("/", [], controller.getStrategies);

export default router;