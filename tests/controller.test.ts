import {describe, it , expect} from 'vitest' ;
import { Pomodoro  , Tag} from '../source/types/models';
import {CreateTestDB} from './test-db';
import { beforeEach } from 'vitest';
import Database from 'better-sqlite3';


const db = CreateTestDB()  ;
// Alterenative implementation for `addPomodoro` since we need to use the test db not the actual production one 
// We could reimplement the function to take the DB as a parameter , but i thought this is a better design, since in the production only one DB will be used
export const CreatePomodoroTest = ( pomodoro: Omit<Pomodoro , 'id'> , tags: string[] , db: any): void => {
	if (pomodoro.duration < 10 * 60) return;

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
export const createPomodoro = (duration: number , now?: Date) : Omit<Pomodoro, 'id'> =>{
	if(now == undefined){
		now = new Date() ; 
	}
    const later = new Date(now.getTime() + duration * 1000) ; 
    return {
        start_datetime: now.toISOString() , 
        end_datetime: later.toISOString(),
        duration
    };
}

beforeEach(() => {
    db.prepare('DELETE FROM pomodoro_tags').run();
    db.prepare('DELETE FROM pomodoros').run();
    db.prepare('DELETE FROM tags').run();
});

describe('add pomodoro', () => {
	it('Should not add pomodoro if duration is less than 10 mins', () => {
		const short_pomo = createPomodoro(5 * 60);
		CreatePomodoroTest(short_pomo, ['focus'] , db) ;
		const count: number = db.prepare(`SELECT COUNT(*) AS c FROM pomodoros`).get().c as number ;
		expect(count).toBe(0);
	});

	it('Should insert pomodoro if duration is 10 mins or more', () => {
		const valid_pomo = createPomodoro(10 * 60);
		CreatePomodoroTest(valid_pomo, ['focus', 'game dev'] , db);
		const row = db.prepare(`SELECT * FROM pomodoros`).all();
        const desired_pomo = row[0] as Pomodoro; 
        expect(desired_pomo.duration).toBe(600) ; 
        expect(row.length).toBe(1) ; 
	});
});