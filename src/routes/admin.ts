import express from "express";
import crypto from "crypto";
import fs from "fs";
import db from "../db";

const adminPanelRouter = express.Router();
adminPanelRouter.use(express.json({ limit: "50mb" })); // Allow large images
adminPanelRouter.use(express.urlencoded({ extended: true }));


// Common routes
import commonRouter from "./common";
adminPanelRouter.use(commonRouter);

// Storing sessions in memory for simplicity
const sessions: { [token: string]: number } = {
    // [token: string]: validUntil: number
};

adminPanelRouter.post("/login", (req, res) => {
    const { password } = req.body;
    const configPassword: { password: string } = db.query(`SELECT password FROM config`).get() as { password: string }; // I hate typescript sometimes
    if (configPassword.password === password) {
        const token = crypto.randomUUID();
        sessions[token] = Date.now() + 1000 * 60 * 60;
        res.json({ token });
        return;
    }

    res.status(401).json({ status: "error" });
});

// Bellow routes are protected
adminPanelRouter.use((req, res, next) => {
    const token = req.headers.authorization;

    // Check if token is valid
    if (!token || !sessions[token]) {
        res.status(401).json({ status: "error" });
        return;
    } 

    // Extend session
    sessions[token] = Date.now() + 1000 * 60 * 60;
    next();

    // Clear expired sessions
    for (const token in sessions) {
        if (sessions[token] < Date.now()) delete sessions[token];
    }
});


// Admin Panel routes
/// -- Cards
adminPanelRouter.post("/cards", (req, res) => {
    const { name, link, image } = req.body;

    // image is a base64 encoded string
    const imageBuffer = Buffer.from(image, "base64");
    const uuid = crypto.randomUUID();
    const imagePath = `images/${uuid}`;
    fs.writeFileSync(`data/${imagePath}`, new Uint8Array(imageBuffer));

    db.run(`INSERT INTO cards (name, link, image) VALUES (?, ?, ?)`, [name, link, imagePath]);
    res.json({ status: "ok" });
});

adminPanelRouter.delete("/cards/:id", (req, res) => {
    const { id } = req.params;
    // Delete image file
    const { image } = db.query(`SELECT image FROM cards WHERE id = ?`).get(id) as { image: string };
    if (image) fs.unlinkSync(`data/${image}`);

    db.run(`DELETE FROM cards WHERE id = ?`, [id]);
    res.json({ status: "ok" });
});


adminPanelRouter.put("/cards/:id", (req, res) => {
    const { id } = req.params;
    const { name, link, image } = req.body;

    // Delete old image file
    const oldImage = db.query(`SELECT image FROM cards WHERE id = ?`).get(id);
    if (oldImage) fs.unlinkSync(`data/${oldImage}`);

    // image is a base64 encoded string
    const imageBuffer = Buffer.from(image, "base64");
    const uuid = crypto.randomUUID();
    const imagePath = `images/${uuid}`;
    fs.writeFileSync(`data/${imagePath}`, new Uint8Array(imageBuffer));

    db.run(`UPDATE cards SET name = ?, link = ?, image = ? WHERE id = ?`, [name, link, imagePath, id]);
    res.json({ status: "ok" });
});

/// -- Config
adminPanelRouter.put("/config", (req, res) => {
    const { title, admin_panel } = req.body;
    db.run(`UPDATE config SET title = ?, admin_panel = ?`, [title, admin_panel]);
    res.json({ status: "ok" });
});

adminPanelRouter.put("/config/password", (req, res) => {
    const { password } = req.body;
    db.run(`UPDATE config SET password = ?`, [password]);
    res.json({ status: "ok" });
});

// Test authentication
adminPanelRouter.get("/auth", (req, res) => {
    res.json({ status: "ok" });
});

// Backup everything
adminPanelRouter.get("/backup", (req, res) => {
    // Zip all files in data folder
    const { exec } = require("child_process");
    exec("zip -r data/backups/backup.zip data", (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        res.download("data/backups/backup.zip");
    });
});


export default adminPanelRouter;