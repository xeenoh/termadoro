import React from 'react';
import { Box, Text } from 'ink';

type Props = {
	label: string;
	duration: string;
	pomodoros_num: number;
    label_color: string; 
};

export const Card = ({ label, duration, pomodoros_num , label_color}: Props) => {
	return (
		<Box flexDirection="column" alignItems="center" width={30} marginBottom={1}>
            <Box justifyContent='center' borderStyle={'round'} flexDirection='column' gap={0}>

                <Text bold color={label_color}> {label.toUpperCase()} </Text>
            </Box>
			<Box
				flexDirection="column"
				borderStyle="round"
				borderColor={label_color}
				paddingX={2}
				paddingY={1}
				width="100%"
			>
				<Text>
					🕒 <Text color="greenBright">Total: </Text> {duration} 
				</Text>
				<Text>
					🍅 <Text color="magentaBright">Pomodoros: </Text> {pomodoros_num}
				</Text>
			</Box>
		</Box>
	);
};
