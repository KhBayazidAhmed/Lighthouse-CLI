import { Command } from 'commander';
import { setupCommands } from './commands/index.js';

const program = new Command();

program
    .name('lighthouse-cli')
    .description('Lighthouse report automation CLI - Generate performance audits for websites')
    .version('1.0.0');

setupCommands(program);

program.parse();