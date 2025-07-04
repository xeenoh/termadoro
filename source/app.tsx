#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import Timer from './Timer.js';
import { printAllPomos } from './cli/AllPomodoros.js';

const cli = meow(
	`
	Usage
	  $ pomo 
	Options
		--name  Your name
        --session Session Length
		--tags "focus"

	Examples
	  $ pomo --session "1h20m1s"
	  $ pomo --session "1h20m1s" --tags "focus,deepwork"
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
            session:{
                type:  'string',
				default : "25m",
            },
			tags:{
				type: 'string', 
				default: 'general' , 
			},
			report:{
				type: 'string',
				default: '',
			}
		},
	},
);

if(cli.flags.report === 'cli'){
	console.log(cli.flags.report) ; 
	printAllPomos() ; 
}else if (cli.flags.report === 'gui'){
	console.error('GUI  is not implemented yet !') ; 
}
else{
	render(<Timer session={cli.flags.session} tags={cli.flags.tags} />);
}

