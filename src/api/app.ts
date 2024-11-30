import express, {Application} from "express";
import cors from "cors";
import {initRoutes} from "./router";
import {PrismaClient} from "@prisma/client";
import fileUpload from "express-fileupload";

export const app: Application = express()
export const prisma = new PrismaClient()

app.use(express.json());
app.use(cors())
app.use(fileUpload());

initRoutes(app).then(() => console.log("All routes initialized."))
