import { installCommandHandler } from '../commands/installCommandHandler';
import { PackageFactory } from '../utils/PackageFactory';
import typer from '../utils/typer';
import { Arguments } from 'yargs';

const { default: inquirer } = require("inquirer");
const clipboard = require('clipboardy');

jest.mock('inquirer');
jest.mock('clipboardy', ()=> ({
	write: jest.fn()
}));
jest.mock('../utils/typer');

const mockedPrompt = inquirer.prompt as jest.MockedFunction<typeof inquirer.prompt>;
const mockedClipboardWrite = clipboard.write as jest.Mock;
const mockedTyper = typer as jest.Mock;

const createArgs = (options: { copy?: boolean, git?: boolean } = {})=> {
	return {
		_: [], $0: '',
		copy: options.copy ?? false,
		git: options.git ?? false
	} as unknown as Arguments;
};

describe('installCommand', ()=> {
	const originalConsoleLog = console.log;
	let consoleOutput: string[] = [];

	beforeEach(()=> {
		consoleOutput = [];
		console.log = (message?: any)=> {
			consoleOutput.push(message);
		};
	});

	afterEach(()=> {
		jest.clearAllMocks();
		console.log = originalConsoleLog;
	});

	it('should install packages normally (no Copy, no Git)', async ()=> {
		jest.spyOn(PackageFactory, 'getAvailablePackages').mockReturnValue([
			{
				label: 'Express',
				dependencies: ['express'],
				devDependencies: ['@types/express'],
				ts: true
			}
		]);
		mockedPrompt.mockResolvedValueOnce({
			selected: [
				{
					label: 'Express',
					dependencies: ['express'],
					devDependencies: ['@types/express'],
					ts: true
				}
			]
		});
		await installCommandHandler(createArgs(), { clipboardWrite: mockedClipboardWrite });
		expect(mockedTyper).toHaveBeenCalledWith(expect.stringContaining('npm i -D @types/{express} && npm i express'));
		expect(mockedClipboardWrite).not.toHaveBeenCalled();
		expect(consoleOutput.join('\n')).toContain('🛈 Tip: Use --copy OR -c to copy the command to clipboard');
		expect(consoleOutput.join('\n')).toContain('🛈 Tip: Use --git OR -g to set up Git');
	});

	it('should copy command to clipboard when --copy is used', async ()=> {
		jest.spyOn(PackageFactory, 'getAvailablePackages').mockReturnValue([
			{
				label: 'Express',
				dependencies: ['express'],
				devDependencies: ['@types/express'],
				ts: true
			}
		]);
		mockedPrompt.mockResolvedValueOnce({
			selected: [
				{
					label: 'Express',
					dependencies: ['express'],
					devDependencies: ['@types/express'],
					ts: true
				}
			]
		});
		await installCommandHandler(createArgs({ copy: true }), { clipboardWrite: mockedClipboardWrite });
		expect(mockedClipboardWrite).toHaveBeenCalledWith(expect.stringContaining('npm init -y && npx tsc --init'));
		expect(mockedTyper).not.toHaveBeenCalled();
		expect(consoleOutput.join('\n')).toContain('Command copied to clipboard');
	});

	it('should set up Git when --git is used', async ()=> {
		jest.spyOn(PackageFactory, 'getAvailablePackages').mockReturnValue([
			{
				label: 'Express',
				dependencies: ['express'],
				devDependencies: ['@types/express'],
				ts: true
			}
		]);
		mockedPrompt.mockResolvedValueOnce({
			selected: [
				{
					label: 'Express',
					dependencies: ['express'],
					devDependencies: ['@types/express'],
					ts: true
				}
			]
		});
		await installCommandHandler(createArgs({ git: true }), { clipboardWrite: mockedClipboardWrite });
		expect(mockedTyper).toHaveBeenCalledWith(expect.stringContaining('git init'));
		expect(mockedClipboardWrite).not.toHaveBeenCalled();
		expect(consoleOutput.join('\n')).toContain('🛈 Tip: Use --copy OR -c to copy the command to clipboard');
	});

	it('should handle both --copy and --git together', async ()=> {
		jest.spyOn(PackageFactory, 'getAvailablePackages').mockReturnValue([
			{
				label: 'Express',
				dependencies: ['express'],
				devDependencies: ['@types/express'],
				ts: true
			}
		]);
		mockedPrompt.mockResolvedValueOnce({
			selected: [
				{
					label: 'Express',
					dependencies: ['express'],
					devDependencies: ['@types/express'],
					ts: true
				}
			]
		});
		await installCommandHandler(createArgs({ copy: true, git: true }), { clipboardWrite: mockedClipboardWrite });
		expect(mockedClipboardWrite).toHaveBeenCalledWith(expect.stringContaining('git init'));
		expect(mockedTyper).not.toHaveBeenCalled();
		expect(consoleOutput.join('\n')).toContain('Command copied to clipboard');
	});

	it('should throw error if something fails', async ()=> {
		mockedPrompt.mockRejectedValueOnce(new Error('Unexpected Error'));
		await installCommandHandler(createArgs(), { clipboardWrite: mockedClipboardWrite });
		expect(consoleOutput.join('\n')).toContain('Unexpected Error');
	});
});
