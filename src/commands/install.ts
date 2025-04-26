import { installCommandHandler } from './installCommandHandler';
import yargs from 'yargs';
import chalk from 'chalk';
import clipboard from 'clipboardy';

const installCommand: yargs.CommandModule = {
  command: 'install',
  aliases: ['i'],
  describe: chalk.bold.yellow('=> To select packages to install'),
  builder: (yargs)=> {
    return yargs.option('git', {
      alias: 'g',
      type: 'boolean',
      describe: chalk.dim.underline('Set up Git')
    }).option('copy', {
      alias: 'c',
      type: 'boolean',
      describe: chalk.dim.underline('Copy the command to clipboard')
    });
  },
  handler: async (args: yargs.Arguments)=> {
    await installCommandHandler(args, { clipboardWrite: clipboard.write });
  }
};

export default installCommand;