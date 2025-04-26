import { PackageFactory } from '../utils/PackageFactory';
import { PackageInfo } from '../types';
import typer from '../utils/typer';
import chalk from 'chalk';
import { Arguments } from 'yargs';
import searchCheckbox from 'inquirer-search-checkbox';

const { default: inquirer } = require("inquirer");
inquirer.registerPrompt('search-checkbox', searchCheckbox);

export async function installCommandHandler(args: Arguments, deps: { clipboardWrite: (text: string)=> Promise<void> }){
	try{
		const packages = PackageFactory.getAvailablePackages();
		const { selected } = await inquirer.prompt([
			{
				type: "search-checkbox" as const,
				name: "selected",
				message: "Select packages (type to search):",
				choices: packages.map(pkg => ({
					name: pkg.label,
					value: pkg
				}))
			}
		]);

		const devDeps = new Set<string>();
		const prodDeps = new Set<string>();
		const typeDeps = new Set<string>();

		console.log(chalk.dim(`\n 📦 Installing ${selected.length} packages:`));
		selected.forEach((pkg: PackageInfo, idx: number) => {
			console.log(` ${idx+1}. `, chalk.green(pkg.label));

			pkg.dependencies?.forEach(dep => {
				if(dep.startsWith('@types/')) typeDeps.add(dep);
				else prodDeps.add(dep);
			});

			pkg.devDependencies?.forEach(dep => {
				if(dep.startsWith('@types/')) typeDeps.add(dep);
				else devDeps.add(dep);
			});

			/* Auto-infer type if TS & simple dep */
			if(pkg.ts && pkg.dependencies?.length === 1) typeDeps.add(`@types/${pkg.dependencies[0]}`);
		});

		const formatTypeDeps = (types: Set<string>): string => {
			const prefix = '@types/';
			const names = [...types]
			.filter(dep => dep.startsWith(prefix))
			.map(dep => dep.slice(prefix.length))
			.sort();
			return names.length > 0 ? `@types/{${names.join(',')}}` : '';
		};

		const groupedTypeDeps = formatTypeDeps(typeDeps);

		const devList = [...devDeps].sort();
		const prodList = [...prodDeps].sort();

		const devInstall = [ ...devList, groupedTypeDeps ].filter(Boolean).join(" ");
		const prodInstall = prodList.join(" ");

		const iCmd =
			devInstall && prodInstall
				? `npm i -D ${devInstall} && npm i ${prodInstall}`
				: devInstall
				? `npm i -D ${devInstall}`
				: `npm i ${prodInstall}`;

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