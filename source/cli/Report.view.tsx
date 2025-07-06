import React from 'react' ; 
import {Box } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';





const RenderReport = () => {
	return (
		<Box justifyContent="center">

			<Gradient name='rainbow'>
				<BigText text=" Termodoro"  font='tiny'/>
			</Gradient>
		</Box>
	);
}

export default RenderReport  ; 