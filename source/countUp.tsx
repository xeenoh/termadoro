import React, {useState, useEffect} from 'react';
import {Box, Text, useStdout} from 'ink';
import figlet from 'figlet';

//TODO change it to parse '1h20m13s'

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



const formatTime = (totalSeconds: number):string => {
	const hours = Math.floor(totalSeconds/3600) ; 
	const minutes = Math.floor((totalSeconds%3600) / 60);
	const seconds = totalSeconds % 60 ; 

	const pad = (n: number) => n.toString().padStart(2, '0');
	return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const CountUp= ({session}:Prop) => {
	const length = parseCommand(session);  // in seconds
	const [counter, setCounter] = useState(length);
	const [output, setOutput] = useState('');
	const [finished , setFinished] = useState(false) ; 
	const [welldone , setWellDone] = useState("");
	const {stdout} = useStdout();

	useEffect(() => {
		if(counter <= 0){
			setFinished(true);
			return ; 
		}
		const timer = setInterval(() => {
		 setCounter(prev => {
			if(prev - 1 <= 0){
				clearInterval(timer) ; 
				setFinished(true) ; 
			}
			return prev-1 ; 
		 });
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		let currentTimer = formatTime(counter) ; 
		figlet.text(currentTimer, {font: 'ANSI Shadow' , width: stdout?.columns|| 80}, (err, data) => {
			if (!err && data) setOutput(data);
		});
	}, [counter]);

	useEffect(() => {
		if(finished){
			figlet.text("Well Done" , {font: 'ANSI Shadow', width: stdout?.columns || 80}, (err, data)=>{
				if(!err && data) setWellDone(data) ; 
			})
		}
	}, [finished]);
	return (
		<Box flexDirection="column">
			<Box
				borderStyle="double"
				borderColor="blue"
				margin={2}
				justifyContent="center"
			>
				<Text>Focus Time</Text>
			</Box>
			{finished ? (
				<Box borderColor={'green'} borderStyle={'double'}>
					<Text color={'red'}>{welldone}</Text>
				</Box>
			) : (
				<Box
					borderStyle="single"
					borderColor="red"
					margin={2}
					justifyContent="center"
				>
					<Text color={'green'}>{output}</Text>
				</Box>
			)}
		</Box>
	);
};

export default CountUp;
