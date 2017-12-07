#!/usr/bin/env node

'use strict';

const dns = require('dns');
const got = require('got');
const logUpdate = require('log-update');
const ora = require('ora');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const arg = process.argv[2];
const log = console.log;
const end = process.exit;
const spinner = ora();
const url = `https://www.google.com/search?q=${arg}%3Denglish`;

if (!arg || arg === '-h') {
	log(`
 Usage: saynum <number>

 Help :
  $ saynum 123
  $ saynum 9181212

 Works upto 12-digit number!
  `);
	end(1);
}

dns.lookup('google.com', err => {
	if (err) {
		logUpdate(`\n ✖ You're offline! \n`);
		end(1);
	} else {
		logUpdate();
		spinner.text = `Converting...`;
		spinner.start();
	}
});

got(url).then(res => {
	const base = res.body;
	const num = base.split('138%">')[1].split('</h2>')[0].split('=')[1];
	logUpdate(`
 ✓ ${num}
		`);
	spinner.stop();
}).catch(err => {
	if (err) {
		logUpdate(`
 That's too damn far!
 `);
		end(1);
	}
});
