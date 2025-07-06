import React, {useRef , useState, useEffect} from 'react';
import { parseCommand ,  formatTime , SaveTimerLog} from '../utils/utils.js';
import {Box } from 'ink';
import BigText from 'ink-big-text';
import notifier from 'node-notifier' ; 
import process from 'process';
import { addPomodoro } from '../db/controller.js';

type Prop = {
	session : string , 
	tags: string
}



const Timer = ({session , tags}: Prop) => {
	
	const length = parseCommand(session); // in seconds
	const startedAt: string = new Date().toISOString();
	const current_tags = tags.split(' ');
	const [counter, setCounter] = useState(length);
	const [finished, setFinished] = useState(false);
	// const[paused , setPaused] = useState(false) ;
	const duration = useRef(counter);

	useEffect(()=>{
	process.on('SIGINT', () => {
			const pomo = SaveTimerLog(length - duration.current, startedAt) ; 
			addPomodoro(pomo , current_tags) ; 
				process.exit();
			// setTimeout(()=>{
			// } , 100)
	});
	process.on('SIGTERM', () => {
			const pomo = SaveTimerLog(length - duration.current, startedAt) ; 
			addPomodoro(pomo , current_tags) ; 
				process.exit();
			// setTimeout(()=>{
			// } , 100)
	});

	} , [])

	useEffect(() => {
		duration.current = counter ; 
	}, [counter]) ; 

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

	// Notification after Pomo Session finishes
	useEffect(() => {
		if (finished) {
			notifier.notify({
				title: 'Timer Finished',
				message: 'Your Session is complete! 🎉',
				sound: true,
			});
			// TODO SAVE LOG in DB
			const pomo = SaveTimerLog(length - duration.current, startedAt) ; 
			addPomodoro(pomo , current_tags) ; 
		}
	}, [finished]);

	return (
		<Box justifyContent="center">
			<Box flexDirection="column">
					<Box justifyContent="center">
						<BigText
							letterSpacing={0}
							font="block"
							backgroundColor="cyan"
							colors={['green', 'magenta']}
							space={false}
							text={formatTime(counter)}
						/>
					</Box>
			</Box>
		</Box>
	);
};

export default Timer;
