import db from './database.js';
import {FullPomodoro} from '../types/models.js';
import {
	getAllPomosQuery,
	getLastWeekPomosQuery,
	getThisWeekPomoQuery,
	getTodayPomoQuery,
	getYesterdayPomoQuery,
    getThisMonthPomoQuery,
    getLastMonthPomoQuery,
    getThisYearPomoQuery, 
    getLastYearPomoQuery
} from './queries.js';

type Report = {pomo_log: FullPomodoro[]; pomo_count: number; total_duration: number};
type RawPomodoro = {
	id?: number;
	start_datetime: string;
	end_datetime: string;
	duration: number;
	tags: string | null;
};

// UTILITY //
const totalPomodoroSum = (pomo: FullPomodoro[]): number => {
    let sum : number  = 0  ; 
     pomo.forEach(e =>{
        sum += e.duration ; 
    }) ; 
    return sum ;
}

const MapPomodoroData = (pomodata: RawPomodoro[]): Report => { 
    const resData: FullPomodoro[] = pomodata.map((pomo: RawPomodoro) => (
        {
            start_datetime: pomo.start_datetime , 
            duration: pomo.duration,
            tags: pomo.tags ? pomo.tags.split(','): [] ,

        }
    )) ; 
    return {pomo_log: resData , pomo_count: resData.length , total_duration: totalPomodoroSum(resData)} ; 
}


export const GetAllPomodoros = (): Report => {
	const current_pomos = db.prepare(getAllPomosQuery).all() as RawPomodoro[];
    return MapPomodoroData(current_pomos) ; 
};

// WEEKLY  RELATED REPORTS
export const REPORT_LASTWEEK = (): Report => {
	const last_week_pom = db.prepare(getLastWeekPomosQuery).all() as RawPomodoro[];
    return MapPomodoroData(last_week_pom) ; 
};

export const REPORT_THISWEEK = (): Report => {
	const this_week_pomos = db
		.prepare(getThisWeekPomoQuery)
		.all() as RawPomodoro[];
    return MapPomodoroData(this_week_pomos) ; 
};

// DAILY RELATED REPORTS
export const REPORT_TODAY = () : Report => {
    const today_pomos = db.prepare(getTodayPomoQuery).all() as RawPomodoro[] ; 
    return MapPomodoroData(today_pomos) ; 
}

export const REPORT_YESTERDAY = () : Report => {
    const yesterday_pomos = db.prepare(getYesterdayPomoQuery).all() as RawPomodoro[] ; 
    return MapPomodoroData(yesterday_pomos) ; 
}

// MONTHLY RELATED REPORTS
export const REPORT_THIS_MONTH= () : Report => {
    const this_month_pomos = db.prepare(getThisMonthPomoQuery).all() as RawPomodoro[] ; 
    return MapPomodoroData(this_month_pomos) ; 
}
export const REPORT_LAST_MONTH= () : Report => {
    const last_month_pomo = db.prepare(getLastMonthPomoQuery).all() as RawPomodoro[] ; 
    return MapPomodoroData(last_month_pomo) ; 
}

// YEARLY  RELATED REPORTS
export const REPORT_THIS_YEAR = () : Report  => {
    const this_year_pomo = db.prepare(getThisYearPomoQuery).all() as RawPomodoro[] ; 
    return MapPomodoroData(this_year_pomo) ; 
}
export const REPORT_LAST_YEAR = () : Report  => {
    const last_year_pomo = db.prepare(getLastYearPomoQuery).all() as RawPomodoro[] ; 
    return MapPomodoroData(last_year_pomo) ; 
}

