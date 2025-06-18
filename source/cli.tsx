#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
// import App from './app.js';
import CountUp from './countUp.js';

const cli = meow(
	`
	Usage
	  $ Pomodoro-CLI

	Options
		--name  Your name
        --sessionLength  <Length>

	Examples
	  $ Pomodoro-CLI --name=Jane
	  Hello, Jane

	  $ Pomodoro-CLI --sessioLength 3600 //<1 Hour>
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
            session:{
                type:  'string',
				default : "1h",
            }
		},
	},
);

render(<CountUp session={cli.flags.session} />);
