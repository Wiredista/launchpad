import { env } from "bun";
import express from "express";
import fs from "fs";

// Preparing ground
const app = express();
const port = env.PORT || 3000;

fs.mkdirSync("data/images", { recursive: true });
fs.mkdirSync("data/backups", { recursive: true });

// Common API Router
import commonRouter from "./routes/common";
app.use("/api", commonRouter);
app.use(express.static("public"));
app.use("/images", express.static("data/images"));


// Admin Panel
import adminPanelRouter from "./routes/admin";
app.use("/admin/api", adminPanelRouter);
app.use("/admin", express.static("private"));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

