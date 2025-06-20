#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
// import App from './app.js';
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
            }
		},
	},
);

render(<Timer session={cli.flags.session} />);
