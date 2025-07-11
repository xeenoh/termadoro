#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import Timer from './views/Timer.view.js';
import RenderReport from './views/Report.view.js';
import { TagsReport } from './views/Card-Tag.view.js';

const cli = meow(

	`
	Usage
	  $ terma
	Options
		--name  Your name
        --session Session Length
		--tags 
		--report  <logs , tags>

	Examples
	  $ terma --session 1h20m1s
	  $ terma --session 1h20m1s --tags "focus,deepwork"
	  $ terma --report logs    "Detailed Logs of past pomodoros"
	  $ terma --report tags    "Detailed Logs of past tags and its durations"

  NOTE: Any Pomodoro duration less than 10 minutes won't be saved in the log 
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
			session: {
				type: 'string',
				default: '25m',
			},
			tags: {
				type: 'string',
				default: 'other',
			},
			report: {
				type: 'string',
				default: '',
			},
		},
	},
);

if (cli.flags.report === 'logs') {
	render(<RenderReport />);
} else if (cli.flags.report === 'tags') {
	render(<TagsReport />);
} else {
	render(<Timer session={cli.flags.session} tags={cli.flags.tags} />);
}

