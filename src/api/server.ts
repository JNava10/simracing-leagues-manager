import {config} from "dotenv";

config()

// @ts-ignore
import * as express from "express";
import {app} from "./app";
const port = process.env.PORT || 3000;

const listenServer = () => {
    app.listen(port, () => {
        console.log(`API listening on http://localhost:${port}`);
    })
};

listenServer();