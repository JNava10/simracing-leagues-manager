// @ts-ignore
import * as express from "express";
import * as controller from "../controllers/auth.controller";
import {body} from "express-validator";
import {checkBodyFields} from "../middlewares/body.middleware";
import {match} from "node:assert";
import {regexList} from "../utils/constants/regex.constants";
import {identifierExists, isCustomEmail, isNick} from "../helpers/validators.helper";

const router = express.Router();

router.post("/login", [
    body()
        .custom(identifierExists).withMessage('An email or nickname are needed'),
    body('email')
        .custom(isCustomEmail).withMessage('Invalid email')
        .optional(),
    body('nickname')
        .custom(isNick).withMessage('Invalid nickname')
        .optional(),
    body('password')
        .exists().withMessage('Password is required')
        .matches(regexList.password).withMessage('Invalid password'),
    checkBodyFields
], controller.login);

export default router;