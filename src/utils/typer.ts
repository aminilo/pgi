import chalk from 'chalk';

const typer = async (txt: string)=> {
	for (let char of txt){
		process.stdout.write(chalk.bold.green(char));
		await new Promise(res=> setTimeout(res, 20));
	}
	// console.log(); /* Final newLine */
	console.log(chalk.dim(' >> Run these to start an awesome project.'));
};

export default typer;
