import React, {useState, useEffect} from 'react';
import {Box , Text} from 'ink';
import beeper from 'beeper';
import BigText from 'ink-big-text';


type Prop = {
	session : String
}

const parseCommand = (session: String): number =>{

const hoursMatch = session.match(/(\d+)h/);
const minutesMatch = session.match(/(\d+)m/);
const secondsMatch = session.match(/(\d+)s/);


const hours = hoursMatch ? parseInt(hoursMatch[1]!)* 3600 : 0 ;
const minutes = minutesMatch ? parseInt(minutesMatch[1]!)* 60 : 0 ;
const seconds = secondsMatch ? parseInt(secondsMatch[1]!) : 0 ;
const total = hours + minutes + seconds ; 

return total ;
}

/**
 * 
 * Session Structure 
 * 	--> logged timer 
 * --> tag 
 * --> savedAt: date.now()
 * 
 * TimerLog:{
 * 	duration: number ,
 *  tag: String ,
 * SavedAt: Date.now() 
 * }
 */

// TODO
// type TimerLog =  {
// 	duration : number , 
// 	tag: String, 
// 	savedAt: Date
// }

// const saveProgress = (current_timer: number) => {
// 	let log: TimerLog = {
// 		duration: 0,
// 		tag: "no tag",
// 		savedAt: Date.now()
// 	};
// 	log.duration = current_timer;
// 	log.tag = "no tag" ;
// 	console.log("saving progress", current_timer)

// }


const formatTime = (totalSeconds: number):string => {
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

const Timer = ({session}: Prop) => {
	const length = parseCommand(session); // in seconds
	const [counter, setCounter] = useState(length);
	// const [output, setOutput] = useState('');
	const [finished, setFinished] = useState(false);

	useEffect(() => {
		if (counter <= 0) {
			setFinished(true);
			return;
		}
		const timer = setInterval(() => {
			setCounter(prev => {
				if (prev - 1 <= 0) {
					clearInterval(timer);
					setFinished(true);
				}
				return prev - 1;
			});
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(()=>{
		if(finished){
			beeper("*~*~*~*");
			
		}
	},[finished]);


	return (
		<Box justifyContent="center">
			<Box flexDirection="column">
				{finished ? (
					<Box
						borderColor={'green'}
						borderStyle={'double'}
						justifyContent="center"
					>
						<Text>Well Done !</Text>
					</Box>
				) : (
					<Box justifyContent="center">
						<BigText
							letterSpacing={0}
							font="block"
							backgroundColor="cyan"
							colors={['green',  'magenta']}
							space={false}
							text={formatTime(counter)}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Timer;
