import * as express from "express";
import * as cors from "cors";
import {initRoutes} from "./router";
import {PrismaClient} from "@prisma/client";

export const app = express()
export const prisma = new PrismaClient()

app.use(express.json());
app.use(cors())

initRoutes(app).then(() => console.log("All routes loaded."))
