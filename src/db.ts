import { Database } from 'bun:sqlite'
const db = new Database('data/data.db')

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

db.run(`
    CREATE TABLE IF NOT EXISTS config (
        title TEXT NOT NULL,
        admin_panel TEXT NOT NULL,
        password TEXT NOT NULL
    );

    INSERT INTO config (title, admin_panel, password) VALUES ("Home Cards", "http://localhost:3001", "insecure");
    `)


// db.run(`CREATE TABLE IF NOT EXISTS config (
//         key TEXT PRIMARY KEY,
//         value TEXT NOT NULL
//     );
//     `)

export default db;