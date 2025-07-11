import React from 'react' ; 
import {Box , Text} from 'ink' ; 
import { FactoryReport, TagData } from '../db/reports.js';
import { formatHours } from '../utils/utils.js';
import { Termodoro } from './Title.view.js';
import db from '../db/database.js';


const {REPORT_TAGS} = FactoryReport(db);

const sliceTags = (tags: any[] , number_per_row: number ) =>{
    const sliced = []; 
    for(let i = 0 ; i < tags.length ; i+=number_per_row){
        sliced.push(tags.slice(i , i + number_per_row)) ;
    }

    return sliced;
}

export const TagCard = (Tag: TagData) => {
    return (
        <Box flexDirection='column' borderStyle={'round'}  gap={1} margin={1} justifyContent='center'>
            <Text bold color={'blue'}>Tag: {Tag.TagName}</Text>
            <Text bold color={'green'}>Total Duration: {Tag.PomoDuration}</Text>
            <Text bold color={'red'}>No. of Pomdoros: {Tag.PomoCount}</Text>
        </Box>
    )
}


export const TagsReport = () => {
	// utility function to render 2 tags per row if length is even
	//3 per row if odd
	const my_tags = REPORT_TAGS();
	const tag_per_row = my_tags.length % 2 === 0 ? 2 : 3;
	const sliced_tags = sliceTags(my_tags, tag_per_row);

	return (
		<Box flexDirection='column' justifyContent='center'>
			<Termodoro />
			{sliced_tags.map((tags_row, i) => (
				<Box key={i} flexDirection="row" justifyContent="center" gap={1}>
					{tags_row.map((tagObj: any) => (
						<TagCard
							key={tagObj.TagName}
							TagName={tagObj.TagName}
							PomoDuration={formatHours(tagObj.PomoDuration)}
							PomoCount={tagObj.PomoCount}
						/>
					))}
				</Box>
			))}
		</Box>

	);
}