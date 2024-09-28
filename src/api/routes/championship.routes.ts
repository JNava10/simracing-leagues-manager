// @ts-ignore
import * as express from "express";
import * as controller from "../controllers/championship.controller";
import {validateToken} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", [validateToken], controller.createChampionship);

export default router;