// @ts-ignore
import * as express from "express";
import {SimulatorController} from "../controllers/simulator.controller";

const router = express.Router();
const controller = new SimulatorController();

router.get("/search", controller.search);

export default router;