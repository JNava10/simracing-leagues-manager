// @ts-ignore
import * as express from "express";
import {body} from "express-validator";
import {UserController} from "../controllers/user.controller";
import {verifyToken} from "../helpers/auth.helper";
import {validateToken} from "../middlewares/socketAuth";

const router = express.Router();
const controller = UserController

router.post("/register", [
    body("nickname")
        .exists()
        .withMessage("El nombre de usuario es obligatorio."),

    body("name")
        .exists()
        .withMessage("El nombre es obligatorio."),

    body("lastname")
        .exists()
        .withMessage("El apellido es obligatorio."),

    body("password")
        .exists()
        .withMessage("La contraseña es obligatoria."),
], controller.createUser);

router.get("/search/nick/:input", controller.searchByNick);

router.get("/own", controller.getOwnData);

router.get("/:id", [validateToken], controller.getById);

router.get("/notifications", controller.getAllNotifications);

export default router;