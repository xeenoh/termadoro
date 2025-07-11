import React, {useRef , useState, useEffect} from 'react';
import { parseCommand ,  formatTime , SaveTimerLog} from '../utils/utils.js';
import {Box , useInput  , Text} from 'ink';
import BigText from 'ink-big-text';
import notifier from 'node-notifier' ; 
import process from 'process';
import { addPomodoro } from '../db/controller.js';

type Prop = {
	session : string , 
	tags: string
}



const Timer = ({session, tags}: Prop) => {
	const length = parseCommand(session); // in seconds
	const startedAt: string = new Date().toISOString();
	const current_tags = tags.split(' ');
	const [counter, setCounter] = useState(length);
	const [finished, setFinished] = useState(false);
	const duration = useRef(counter);
	const [paused, setPaused] = useState(false);

	useInput((input, key) => {
		if (input === ' ' || key.escape) {
			setPaused(prev => {
				const newState = !prev;
				return newState;
			});
		}
	});
	useEffect(() => {
		process.on('SIGINT', () => {
			const pomo = SaveTimerLog(length - duration.current, startedAt);
			addPomodoro(pomo, current_tags);
			process.exit();
		});
		process.on('SIGTERM', () => {
			const pomo = SaveTimerLog(length - duration.current, startedAt);
			addPomodoro(pomo, current_tags);
			process.exit();
		});
	}, []);

	useEffect(() => {
		duration.current = counter;
	}, [counter]);

	useEffect(() => {
		if(paused) return ; 
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
	}, [paused]);

	// Notification after Pomo Session finishes
	useEffect(() => {
		if (finished) {
			notifier.notify({
				title: 'Timer Finished',
				message: 'Your Session is complete! 🎉',
				sound: true,
			});
			const pomo = SaveTimerLog(length - duration.current, startedAt);
			addPomodoro(pomo, current_tags);
		}
	}, [finished]);

	return (
		<Box justifyContent="center">
			<Box flexDirection="column">
				<Box justifyContent="center">
					<BigText
						letterSpacing={0}
						space={false}
						text={formatTime(counter)}
					/>
				</Box>
				{ (paused) ? 
				<Box justifyContent='center' flexDirection='column' marginLeft={3}>
					<BigText
					letterSpacing={0}
						space={false}
						text = {"Paused"}
					/>
					<Box marginLeft={8}>
					<Text color={'red'} >Press Space or Escape to resume</Text>
					</Box>
				</Box>: <></>}
			</Box>
		</Box>
	);
};

export default Timer;
