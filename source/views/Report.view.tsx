import React from 'react' ; 
import {Box  } from 'ink';
import {Card} from './Card.view.js';
import db from '../db/database.js';
import {
	Report ,
	FactoryReport,
	// REPORT_TODAY,
	// REPORT_YESTERDAY,
	// REPORT_THISWEEK,
	// REPORT_LASTWEEK,
	// REPORT_LAST_MONTH,
	// REPORT_THIS_MONTH,
} from '../db/reports.js';
import { Termodoro } from './Title.view.js';

const formatHours = (seconds: number | string): string => {
	if(typeof seconds === 'string'){
		seconds = parseInt(seconds , 10) ; 
	}
	
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	return `${hours}h ${minutes}m`;


};

const {
	REPORT_TODAY , 
	REPORT_YESTERDAY,
	REPORT_THISWEEK , 
	REPORT_LASTWEEK,
	REPORT_THIS_MONTH,
	REPORT_LAST_MONTH
} = FactoryReport(db) ; 

const RenderReport = () => {
	const today: Report = REPORT_TODAY();
	const yesterday: Report = REPORT_YESTERDAY();
	const this_week: Report = REPORT_THISWEEK();
	const last_week: Report = REPORT_LASTWEEK();
	const this_month: Report = REPORT_THIS_MONTH();
	const last_month: Report = REPORT_LAST_MONTH();
	return (
		<Box flexDirection="row" justifyContent="center" gap={2}>
			<Box flexDirection='column' justifyContent='center'>
				<Termodoro/>
			<Box flexDirection="row" justifyContent="center" gap={1}>
				<Card
					label="Yesterday"
					duration={formatHours(yesterday.total_duration)}
					pomodoros_num={yesterday.pomo_count}
					label_color="blue"
				/>
				<Card
					label="Today"
					duration={formatHours(today.total_duration)}
					pomodoros_num={today.pomo_count}
					label_color="yellow"
				/>
			</Box>

			<Box flexDirection="row" justifyContent="center" gap={1}>
				<Card
					label="Last Week"
					duration={formatHours(last_week.total_duration)}
					pomodoros_num={last_week.pomo_count}
					label_color="blue"
				/>
				<Card
					label="This Week"
					duration={formatHours(this_week.total_duration)}
					pomodoros_num={this_week.pomo_count}
					label_color="green"
				/>
			</Box>

			<Box flexDirection="row" justifyContent="center" gap={1}>
				<Card
					label="Last Month"
					duration={formatHours(last_month.total_duration)}
					pomodoros_num={last_month.pomo_count}
					label_color="blue"
				/>
				<Card
					label="This Month"
					duration={formatHours(this_month.total_duration)}
					pomodoros_num={this_month.pomo_count}
					label_color="green"
				/>
			</Box>
			</Box>
		</Box>
	);
};

export default RenderReport; 