import { Pomodoro } from '../types/models.js';


export const SaveTimerLog = (duration: number , startedAt: string): Pomodoro  => {
	const start = new Date(startedAt) ; 
	const end = new Date(start.getTime() + duration * 1000) ; 
    const pomo: Pomodoro  = { 
        start_datetime : startedAt , 
        end_datetime : end.toISOString(), 
        duration : duration,
    };
    return pomo;
}

export const parseCommand = (session: String): number =>{

const hoursMatch = session.match(/(\d+)h/);
const minutesMatch = session.match(/(\d+)m/);
const secondsMatch = session.match(/(\d+)s/);


const hours = hoursMatch ? parseInt(hoursMatch[1]!)* 3600 : 0 ;
const minutes = minutesMatch ? parseInt(minutesMatch[1]!)* 60 : 0 ;
const seconds = secondsMatch ? parseInt(secondsMatch[1]!) : 0 ;
const total = hours + minutes + seconds ; 

return total ;
}

export const formatTime = (totalSeconds: number):string => {
	const hours = Math.floor(totalSeconds/3600) ; 
	const minutes = Math.floor((totalSeconds%3600) / 60);
	const seconds = totalSeconds % 60 ; 

	const pad = (n: number) => n.toString().padStart(2, '0');
	const parts = [] ; 
	if(hours > 0) parts.push(pad(hours)) ; 
	if(minutes > 0 || hours > 0) parts.push(pad(minutes)) ; 
	parts.push(pad(seconds)) ; 
	return parts.join(':');
}


// FOR handling the total durations for pomodoro when rendering the report
export const formatHours = (seconds: number | string): string => {
	if(typeof seconds === 'string'){
		seconds = parseInt(seconds , 10) ; 
	}
	
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	return `${hours}h ${minutes}m`;
};
