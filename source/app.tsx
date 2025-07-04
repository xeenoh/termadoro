#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import Timer from './Timer.js';

const cli = meow(
	`
	Usage
	  $ pomo 
	Options
		--name  Your name
        --session Session Length

	Examples
	  $ pomo --session "1h20m1s"
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
			}
		},
	},
);


render(<Timer session={cli.flags.session} tags={cli.flags.tags} />);
