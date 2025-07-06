import db from './database.js' ; 
import { Pomodoro , Tag } from '../types/models.js';


export function addPomodoro(pomodoro: Omit<Pomodoro , 'id'> , tags: string[]):void {

	const insertPomodoro = db.prepare(
		`
            INSERT INTO pomodoros (start_datetime , end_datetime , duration)
            VALUES (?,?,?)
        `,
	);

	const result = insertPomodoro.run(
		pomodoro.start_datetime,
		pomodoro.end_datetime,
		pomodoro.duration,
	);

	const pomodoro_id = result.lastInsertRowid as number;

	const insertTag = db.prepare(
		`
            INSERT OR IGNORE INTO tags (name) VALUES (?)
        `,
	);

	const getTagID = db.prepare(
		`
            SELECT id FROM tags
            WHERE  name = ?
        `,
	);

	const linkTagToPomodoro = db.prepare(
		`
            INSERT OR IGNORE INTO pomodoro_tags (tags_id , pomodoro_id)
            VALUES (? , ?)
        `,
	);
	for (let tag of tags){
		tag = tag.trim().toLowerCase();
	    insertTag.run(tag);
	    const tagRow = getTagID.get(tag) as Tag ;
	    linkTagToPomodoro.run(tagRow.id , pomodoro_id);
	}
}
