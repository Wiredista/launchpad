import express from "express";
import { env } from "bun";
import db from "../db";

const apiRouter = express.Router();
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

// -- Config
apiRouter.get("/config", (req, res) => {
    // typescript madness
    const config = db.query(`SELECT * FROM config`).all() as Record<string, string>[];

    const configObj = {} as Record<string, string>;
    for (const { key, value } of config) {
        configObj[key] = value;
    }

    delete configObj.password;

    res.json(configObj);
});


// -- Cards
apiRouter.get("/cards", (req, res) => {
    const cards = db.query(`SELECT * FROM cards`).all();
    res.json(cards);
});

export default apiRouter;