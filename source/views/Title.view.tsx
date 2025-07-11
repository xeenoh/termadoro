import React  from "react"
import Gradient from "ink-gradient"
import { Box  } from "ink"
import BigText from "ink-big-text"


export const Termodoro = () => {
	return (
		<Box justifyContent="center">
			<Gradient name="rainbow">
				<BigText text=" TermAdoro" font="tiny" />
			</Gradient>
		</Box>
	);
}