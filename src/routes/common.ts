import express from "express";
import { env } from "bun";
import db from "../db";

const apiRouter = express.Router();
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

// -- Config
apiRouter.get("/config", (req, res) => {
    const config = db.query(`SELECT title, admin_panel FROM config`).get();
    res.json(config);
});


// -- Cards
apiRouter.get("/cards", (req, res) => {
    const cards = db.query(`SELECT * FROM cards`).all();
    res.json(cards);
});

export default apiRouter;