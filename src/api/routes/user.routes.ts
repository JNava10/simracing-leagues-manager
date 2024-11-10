// @ts-ignore
import * as express from "express";
import {body} from "express-validator";
import {UserController} from "../controllers/user.controller";

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

export default router;