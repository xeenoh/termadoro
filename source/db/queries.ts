import db from "./database.js"
import { FullPomodoro} from "../types/models.js"


const getAllPomosQuery = `
    SELECT
        p.id , 
        p.duration, 
        p.start_datetime , 
        GROUP_CONCAT(t.name, ',') AS tags
    FROM pomodoros AS p 
    LEFT JOIN pomodoro_tags pt on pt.pomodoro_id = p.id 
    LEFT JOIN tags t on pt.tags_id = t.id 
    GROUP BY p.id 
    ORDER BY p.start_datetime DESC 
`;

export const GetAllPomodoros = () : FullPomodoro[] =>   {
    let current_pomos = db.prepare(getAllPomosQuery).all(); 
    current_pomos = current_pomos.map((pomo: any) => ({
        id: pomo.id,
        start_datetime: pomo.start_datetime,
        duration: pomo.duration,
        tags: pomo.tags ? pomo.tags.split(',') : []
    })) ;
    return current_pomos;
}