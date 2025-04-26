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
    try{
      const iCmd = 'blabla';
      
      if(args?.copy && args?.git) {
        await clipboard.write(`npm init -y && npx tsc --init && ${iCmd} && git init && touch .gitignore && { echo "node_modules/"; echo "dist/"; echo ".env"; } > $_`);
        console.log(chalk.bgBlack.italic(" >> 📋 Command copied to clipboard! Just paste it to initialize & install the stack!!"));
      } else if(args?.git) {
        console.log(chalk.bgBlack.italic(" >> 🛈 Tip: Use --copy OR -c to copy the command to clipboard."));
        console.log(` npm init -y && npx tsc --init && ${iCmd} && git init && touch .gitignore && { echo "node_modules/"; echo "dist/"; echo ".env"; } > $_ `);
      } else if(args?.copy) {
        console.log(chalk.bgBlack.italic(" >> 🛈 Tip: Use --git OR -g to set up Git."));
        await clipboard.write(`npm init -y && npx tsc --init && ${iCmd}`);
        console.log(chalk.bgBlack.italic(" >> 📋 Command copied to clipboard! Just paste it to initialize & install the stack!!"));
      } else {
        console.log(chalk.bgBlack.italic(" >> 🛈 Tip: Use --copy OR -c to copy the command to clipboard."));
        console.log(chalk.bgBlack.italic(" >> 🛈 Tip: Use --git OR -g to set up Git."));
        console.log(` npm init -y && npx tsc --init && ${iCmd}`);
      }
    }catch(err){
      if(err instanceof Error){
        console.log(chalk.red.bold(err.message));
      }else{
        console.log(err);
      }
    }
  }
};

export default installCommand;