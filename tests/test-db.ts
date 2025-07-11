import Database from 'better-sqlite3';

export const CreateTestDB = () => {
	const db = new Database(':memory:');
	db.pragma('foreign_keys  = ON');
	db.exec(
		` 

    CREATE TABLE IF NOT EXISTS "tags"(
    "id" INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT, 
    "name" TEXT NOT NULL UNIQUE COLLATE NOCASE
);

CREATE TABLE IF NOT EXISTS "pomodoros"(
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_datetime" TEXT NOT NULL UNIQUE , 
    "end_datetime" TEXT  NOT NULL UNIQUE, 
    "duration" INTEGER --seconds
) ; 

CREATE TABLE IF NOT EXISTS "pomodoro_tags"(
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tags_id" INTEGER NOT NULL , 
    "pomodoro_id" INTEGER NOT NULL, 

    FOREIGN KEY("tags_id") REFERENCES "tags"("id") ON DELETE CASCADE, 
    FOREIGN KEY("pomodoro_id") REFERENCES "pomodoros"("id") ON DELETE CASCADE 
) ; 
`,
	);

    return db; 
};
