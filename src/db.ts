import { Database } from 'bun:sqlite'
import fs from 'fs'

fs.mkdirSync("data", { recursive: true });
const db = new Database('data/data.db');

db.run(`
    CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY,
        link TEXT NOT NULL,
        image TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT
    );
    `)

db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY,
        token TEXT NOT NULL,
        user_id INTEGER NOT NULL
    );
    `)

// Older database schema's config used this columns:
/*
 * title TEXT NOT NULL,
 * admin_panel TEXT NOT NULL,
 * password TEXT NOT NULL
 */
// If it exists like that, change to new model

// Migration from older schema
function migrateDatabase() {
    // Check if the table exists
    const configTable = db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='config';").all();
    if (!configTable.length) return;

    // Check if the columns are in the old format
    const columns = db.query("PRAGMA table_info(config);").all() as Record<string, any>[];
    const oldColumns = columns.filter(c => c.name === "title" || c.name === "admin_panel" || c.name === "password")
    if(!oldColumns.length) return;

    // Migrate the data
    const oldData = db.query("SELECT * FROM config;").all() as Record<string, any>[];
    const newData = oldData.map((row) => {
        return {
            key: "title",
            value: row.title
        }
    })

    // Drop the old columns
    db.run("ALTER TABLE config RENAME TO config_old;")
    db.run(`
        CREATE TABLE IF NOT EXISTS config (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );
    `)

    // Insert the new data
    db.run("BEGIN TRANSACTION;")
    for (const row of newData) {
        db.run("INSERT INTO config (key, value) VALUES (?, ?);", row.key, row.value)
    }
    db.run("COMMIT;")
    db.run("DROP TABLE config_old;")
}


migrateDatabase();
db.run(`
    CREATE TABLE IF NOT EXISTS config (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
    );

    INSERT INTO config (key, value) VALUES ("title", "LaunchPad");
    INSERT INTO config (key, value) VALUES ("password", "default");
    `)

export default db;