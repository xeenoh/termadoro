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
    getLastYearPomoQuery,
    getTagsAndDurationsQuery
} from './queries.js';

export type Report = {pomo_log: FullPomodoro[]; pomo_count: number; total_duration: number};
type RawPomodoro = {
	id?: number;
	start_datetime: string;
	end_datetime: string;
	duration: number;
	tags: string | null;
};
export type TagData = {
    id? : number ;
    TagName: string; 
    PomoDuration: number | string; 
    PomoCount: number;
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


//
export const FactoryReport = (db: any) => ({
    GetAllPomodoros: (): Report => MapPomodoroData(db.prepare(getAllPomosQuery).all()),
    REPORT_LASTWEEK: (): Report => MapPomodoroData(db.prepare(getLastWeekPomosQuery).all()),
	REPORT_THISWEEK: (): Report => MapPomodoroData(db.prepare(getThisWeekPomoQuery).all()),
	REPORT_TODAY: (): Report => MapPomodoroData(db.prepare(getTodayPomoQuery).all()),
	REPORT_YESTERDAY: (): Report => MapPomodoroData(db.prepare(getYesterdayPomoQuery).all()),
	REPORT_THIS_MONTH: (): Report => MapPomodoroData(db.prepare(getThisMonthPomoQuery).all()),
	REPORT_LAST_MONTH: (): Report => MapPomodoroData(db.prepare(getLastMonthPomoQuery).all()),
	REPORT_THIS_YEAR: (): Report => MapPomodoroData(db.prepare(getThisYearPomoQuery).all()),
	REPORT_LAST_YEAR: (): Report => MapPomodoroData(db.prepare(getLastYearPomoQuery).all()),
	REPORT_TAGS: (): TagData[] =>
		db.prepare(getTagsAndDurationsQuery)
			.all()
			.map((e: any) => ({
				TagName: e.name,
				PomoDuration: e.total_duration,
				PomoCount: e.total_pomos
			}))
})