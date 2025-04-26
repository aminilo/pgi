import typer from '../utils/typer';
import chalk from 'chalk';
import { Arguments } from 'yargs';

export async function installCommandHandler(args: Arguments, deps: { clipboardWrite: (text: string)=> Promise<void> }){
	try{
      const iCmd = 'blabla';
      
      if(args?.copy && args?.git) {
        await deps.clipboardWrite(`npm init -y && npx tsc --init && ${iCmd} && git init && touch .gitignore && { echo "node_modules/"; echo "dist/"; echo ".env"; } > $_`);
        console.log(chalk.bgBlack.italic(" >> 📋 Command copied to clipboard! Just paste it to initialize & install the stack!!"));
      } else if(args?.git) {
        console.log(chalk.bgBlack.italic(" >> 🛈 Tip: Use --copy OR -c to copy the command to clipboard."));
        await typer(` npm init -y && npx tsc --init && ${iCmd} && git init && touch .gitignore && { echo "node_modules/"; echo "dist/"; echo ".env"; } > $_ `);
      } else if(args?.copy) {
        console.log(chalk.bgBlack.italic(" >> 🛈 Tip: Use --git OR -g to set up Git."));
        await deps.clipboardWrite(`npm init -y && npx tsc --init && ${iCmd}`);
        console.log(chalk.bgBlack.italic(" >> 📋 Command copied to clipboard! Just paste it to initialize & install the stack!!"));
      } else {
        console.log(chalk.bgBlack.italic(" >> 🛈 Tip: Use --copy OR -c to copy the command to clipboard."));
        console.log(chalk.bgBlack.italic(" >> 🛈 Tip: Use --git OR -g to set up Git."));
        await typer(` npm init -y && npx tsc --init && ${iCmd}`);
      }
    }catch(err){
      if(err instanceof Error){
        console.log(chalk.red.bold(err.message));
      }else{
        console.log(err);
      }
    }
}