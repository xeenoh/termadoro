

export const getAllPomosQuery = `
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


                                                                // WEEKLY 
export const getLastWeekPomosQuery = `
    SELECT 
        p.id,
        p.duration , 
        p.start_datetime,
        GROUP_CONCAT(t.name , ',') AS tags
    FROM pomodoros AS p
    LEFT JOIN pomodoro_tags pt on p.id = pt.pomodoro_id
    LEFT JOIN tags t on pt.tags_id = t.id
    WHERE DATE(p.start_datetime) BETWEEN DATE('now' ,  '-13 days' , 'weekday 1')
    AND DATE('now' , '-7 days' , 'weekday 0') 
    GROUP BY p.id ; 
`;

export const getThisWeekPomoQuery = `
    SELECT 
        p.id,
        p.duration , 
        p.start_datetime,
        GROUP_CONCAT(t.name , ',') AS tags
    FROM pomodoros AS p
    LEFT JOIN pomodoro_tags pt on p.id = pt.pomodoro_id
    LEFT JOIN tags t on pt.tags_id = t.id
    WHERE DATE(p.start_datetime) BETWEEN DATE('now' ,  'weekday 1' , '-7 days')
    AND DATE('now')
    GROUP BY p.id ; 
`

                                                                // DAILY 
export const getTodayPomoQuery = 
`
    SELECT 
        p.id,
        p.duration , 
        p.start_datetime,
        GROUP_CONCAT(t.name , ',') AS tags
    FROM pomodoros AS p
    LEFT JOIN pomodoro_tags pt on p.id = pt.pomodoro_id
    LEFT JOIN tags t on pt.tags_id = t.id
    WHERE DATE(p.start_datetime) = DATE('now')
    GROUP BY p.id ; 
` ;
export const getYesterdayPomoQuery = 
`
    SELECT 
        p.id,
        p.duration , 
        p.start_datetime,
        GROUP_CONCAT(t.name , ',') AS tags
    FROM pomodoros AS p
    LEFT JOIN pomodoro_tags pt on p.id = pt.pomodoro_id
    LEFT JOIN tags t on pt.tags_id = t.id
    WHERE DATE(p.start_datetime) = DATE('now' , '-1 day')
    GROUP BY p.id ; 
` ;

                                                                // MONTHLY
export const getThisMonthPomoQuery = 
`
    SELECT 
        p.id,
        p.duration , 
        p.start_datetime,
        GROUP_CONCAT(t.name , ',') AS tags
    FROM pomodoros AS p
    LEFT JOIN pomodoro_tags pt on p.id = pt.pomodoro_id
    LEFT JOIN tags t on pt.tags_id = t.id
    WHERE strftime('%Y-%m' , p.start_datetime) = strftime('%Y-%m', 'now')
    GROUP BY p.id ; 
`

export const getLastMonthPomoQuery = 
`
    SELECT 
        p.id,
        p.duration , 
        p.start_datetime,
        GROUP_CONCAT(t.name , ',') AS tags
    FROM pomodoros AS p
    LEFT JOIN pomodoro_tags pt on p.id = pt.pomodoro_id
    LEFT JOIN tags t on pt.tags_id = t.id
    WHERE strftime('%Y-%m' , p.start_datetime) = strftime('%Y-%m', 'now' , '-1 month')
    GROUP BY p.id ; 
`
                                                                // YEARLY
export const getThisYearPomoQuery = `
    SELECT 
        p.id,
        p.duration , 
        p.start_datetime,
        GROUP_CONCAT(t.name , ',') AS tags
    FROM pomodoros AS p
    LEFT JOIN pomodoro_tags pt on p.id = pt.pomodoro_id
    LEFT JOIN tags t on pt.tags_id = t.id
    WHERE DATE(p.start_datetime, 'localtime') >= DATE('now', 'start of year', 'localtime') AND DATE(p.start_datetime, 'localtime') <= DATE('now', 'localtime')

    GROUP BY p.id ; 
`;

export const getLastYearPomoQuery = 
`
    SELECT 
        p.id,
        p.duration , 
        p.start_datetime,
        GROUP_CONCAT(t.name , ',') AS tags
    FROM pomodoros AS p
    LEFT JOIN pomodoro_tags pt on p.id = pt.pomodoro_id
    LEFT JOIN tags t on pt.tags_id = t.id
    WHERE DATE(p.start_datetime, 'localtime') >= DATE('now', 'start of year', '-1 year', 'localtime')
    AND DATE(p.start_datetime, 'localtime') < DATE('now', 'start of year', 'localtime')

    GROUP BY p.id ; 
`
export const getTagsAndDurationsQuery = `
SELECT 
    t.id,
    t.name,
    SUM(p.duration) AS total_duration,
    COUNT(p.id) AS total_pomos
FROM tags AS t
JOIN pomodoro_tags pt ON pt.tags_id = t.id
JOIN pomodoros p ON p.id = pt.pomodoro_id
GROUP BY t.id
ORDER BY total_duration DESC, p.end_datetime DESC
LIMIT 6 ; 
`;