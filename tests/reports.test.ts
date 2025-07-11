import { describe  , it , expect , beforeEach } from "vitest";
import {FactoryReport} from '../source/db/reports' ; 
import {CreatePomodoroTest , createPomodoro} from './controller.test' ; 
import { Report } from "../source/db/reports";
import { CreateTestDB } from "./test-db";
const db = CreateTestDB() ; 
const {
    REPORT_LAST_MONTH,
    REPORT_LASTWEEK,
    REPORT_THISWEEK,
    REPORT_TODAY , 
    REPORT_YESTERDAY,
    REPORT_THIS_MONTH, 
    REPORT_THIS_YEAR ,
    REPORT_LAST_YEAR
}= FactoryReport(db) ;

// TEST DATA
const startDatetimes = [
	// ✅ Today (e.g., July 10, 2025 at 10:00 AM)
	new Date(2025, 6, 10, 10, 0, 0),
	// ✅ Yesterday (e.g., July 9, 2025 at 8:15 AM)
	new Date(2025, 6, 9, 8, 15, 0),
	// ✅ Earlier this week (e.g., Monday July 7, 2025 at 16:45 PM) , (July 8)
	new Date(2025, 6, 8, 16, 45, 0),
	new Date(2025, 6, 7, 16, 45, 0),
	// ✅ Last week (e.g., July 2, 2025)
	new Date(2025, 6, 2, 11, 30, 0),
	// ✅ This month - mid (e.g., July 5)
	new Date(2025, 6, 5, 14, 0, 0),
	// ✅ End of last month (June 30)
	new Date(2025, 5, 30, 20, 0, 0),
	// ✅ Mid last month (June 15)
	new Date(2025, 5, 15, 12, 0, 0),
	// ✅ 3 months ago (April 20)
	new Date(2025, 3, 20, 19, 45, 0),
	// ✅ Edge case: start of year (Jan 1)
	new Date(2025, 0, 1, 0, 0, 0),

	// ✅ Edge case: end of year (Dec 31)
	new Date(2024, 11, 31, 23, 59, 59),

	// ✅ Leap year test (Feb 29, 2024)
	new Date(2024, 1, 29, 10, 0, 0),

	// ✅ Far future
	new Date(2026, 0, 1, 12, 0, 0),
];

beforeEach(() => {
	db.prepare('DELETE FROM pomodoro_tags').run();
	db.prepare('DELETE FROM pomodoros').run();
	db.prepare('DELETE FROM tags').run();

	startDatetimes.forEach((date, i) => {
		let pomo = createPomodoro(1500, date);
		CreatePomodoroTest(pomo, [`tag-${i}`], db);
	});
});

describe('Testing the Reports', () => {
	it('Testing the Report of Today', () => {
		const today: Report = REPORT_TODAY();
		expect(today.pomo_count).toBe(1);
		expect(today.total_duration).toBe(1500);
	});

	it('Testing the Report of Yesterday', () => {
		const yesterday: Report = REPORT_YESTERDAY();
		expect(yesterday.pomo_count).toBe(1);
		expect(yesterday.total_duration).toBe(1500);
		expect(yesterday.pomo_log[0].start_datetime).toBe(
			startDatetimes[1].toISOString(),
		);
	});

	it('Testing the Report of This Week', () => {
		const this_week: Report = REPORT_THISWEEK();
		expect(this_week.pomo_count).toBe(4);
		expect(this_week.total_duration).toBe(4 * 1500);
	});

	it('Testing the Report of Last Week', () => {
		const last_week: Report = REPORT_LASTWEEK();
		expect(last_week.pomo_count).toBe(3);
		expect(last_week.total_duration).toBe(3 * 1500);
	});

	it('Testing the Report of This Month', () => {
		const this_month: Report = REPORT_THIS_MONTH(); 
        expect(this_month.pomo_count).toBe(6);
		expect(this_month.total_duration).toBe(6 * 1500);
	});

	it('Testing the Report of Last Month', () => {
		const last_month: Report = REPORT_LAST_MONTH(); 
        expect(last_month.pomo_count).toBe(2);
		expect(last_month.total_duration).toBe(2 * 1500);
	});

    it('Testing the Report of This Year' , () => {
        const this_year: Report = REPORT_THIS_YEAR() ; 
        expect(this_year.pomo_count).toBe(10);
        expect(this_year.total_duration).toBe(10 * 1500) ; 
    })

    it('Testing the Report of Last Year' , () => {
        const this_year: Report = REPORT_LAST_YEAR() ; 
        expect(this_year.pomo_count).toBe(2);
        expect(this_year.total_duration).toBe(2 * 1500) ; 
    })
});


