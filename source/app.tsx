#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import Timer from './cli/Timer.view.js';
import RenderReport from './cli/Report.view.js';

const cli = meow(
	`
	Usage
	  $ pomo 
	Options
		--name  Your name
        --session Session Length
		--tags 
		--report <cli , gui>

	Examples
	  $ pomo --session 1h20m1s
	  $ pomo --session 1h20m1s --tags "focus,deepwork"
	  $ pomo --report cli

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
				default: 'general',
			},
			report: {
				type: 'string',
				default: '',
			},
		},
	},
);

if (cli.flags.report === 'cli') {
	render(<RenderReport />)
} else if (cli.flags.report === 'gui') {
	console.error('GUI  is not implemented yet !');
} else {
	render(<Timer session={cli.flags.session} tags={cli.flags.tags} />);
}

