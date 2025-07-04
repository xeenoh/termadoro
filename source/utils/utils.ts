import { Pomodoro } from '../types/models.js';


export const SaveTimerLog = (duration: number , startedAt: string): Pomodoro  => {
    const pomo: Pomodoro  = { 
        start_datetime : startedAt , 
        end_datetime : new Date().toISOString(),
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