// @ts-ignore
import * as express from "express";
import * as controller from "../controllers/track.controller";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/search", controller.search);

export default router;