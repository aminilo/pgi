#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import installCommand from "./commands/install";
import figlet from 'figlet';
import chalk from 'chalk';

(()=> {
	/* Doom Epic Ogre Puffy Rounded Slant Speed */
	console.log(chalk.magenta(figlet.textSync('PGI', { font: 'Speed', horizontalLayout: 'full' })));
	console.log(chalk.green(` 🚀 ${chalk.bold('Package Git Initializer')} - Pick your favorite packages and embark!\n`));
})();

yargs(hideBin(process.argv)).command(installCommand).demandCommand(1, "You need to provide a valid command").strict().help().argv;
