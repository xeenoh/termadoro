import Database from 'better-sqlite3' ; 
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs' ; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname , 'pomodoro.db');

fs.mkdirSync(path.dirname(DB_FILE) , {recursive: true}) ; 


const db: any = new Database(DB_FILE);

db.exec(`
    PRAGMA foreign_keys = ON ; 

    CREATE TABLE IF NOT EXISTS "tags"(
    "id" INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT, 
    "name" TEXT NOT NULL UNIQUE COLLATE NOCASE
);

CREATE TABLE IF NOT EXISTS "pomodoros"(
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_datetime" TEXT NOT NULL , 
    "end_datetime" TEXT  NOT NULL , 
    "duration" INTEGER --seconds
) ; 

CREATE TABLE IF NOT EXISTS "pomodoro_tags"(
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tags_id" INTEGER NOT NULL , 
    "pomodoro_id" INTEGER NOT NULL, 

    FOREIGN KEY("tags_id") REFERENCES "tags"("id") , 
    FOREIGN KEY("pomodoro_id") REFERENCES "pomodoros"("id")  
) ; 
`); 

export  default db ; 
