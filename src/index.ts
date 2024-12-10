import { env } from "bun";
import express from "express";
import fs from "fs";

// Preparing ground
const app = express();
const adminPanel = express();
const port = env.PORT || 3000;
const adminPort = env.ADMIN_PORT || 3001;

fs.mkdirSync("data/images", { recursive: true });
fs.mkdirSync("data/backups", { recursive: true });


// Preparing database


// Common API Router
import commonRouter from "./routes/common";
app.use("/api", commonRouter);
app.use(express.static("public"));
app.use("/images", express.static("data/images"));




// Admin Panel
import adminPanelRouter from "./routes/admin";
adminPanel.use("/api", adminPanelRouter);
adminPanel.use("/api", commonRouter);
adminPanel.use(express.static("private"));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

adminPanel.listen(adminPort, () => {
    console.log(`Admin panel is running at http://localhost:${adminPort}`);
});