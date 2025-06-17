#!/usr/bin/env node

import { Command } from 'commander';

interface HelloOptions {
    name: string;
}

const program = new Command();

program
    .name('lighthouse-cli')
    .description('A TypeScript CLI application')
    .version('1.0.0');

program
    .command('hello')
    .description('Say hello')
    .option('-n, --name <name>', 'name to greet', 'World')
    .action((options: HelloOptions) => {
        console.log(`Hello, ${options.name}!`);
    });

program
    .command('info')
    .description('Show CLI information')
    .action(() => {
        console.log('Light House CLI - A TypeScript CLI application');
        console.log('Built with TypeScript and Commander.js');
    });

program.parse();