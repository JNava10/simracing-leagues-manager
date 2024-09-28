// @ts-ignore
import * as express from "express";
import * as controller from "../controllers/score.controller";

const router = express.Router();

router.get("/", controller.getScoreSystems);

export default router;