import { PackageFactory } from '../utils/PackageFactory';
import { PackageInfo } from '../types';

describe('PackageFactory', ()=> {
	describe('create()', ()=> {
		it('should create a regular dependency package from string', ()=> {
			const result = PackageFactory.create('uuid');
			expect(result).toEqual<PackageInfo>({
				label: 'uuid',
				dependencies: ['uuid'],
				devDependencies: undefined,
				dev: false,
				ts: false
			});
		});

		it('should create a dev dependency package from string with dev flag', ()=> {
			const result = PackageFactory.create('Nodemon', undefined, { dev: true });
			expect(result).toEqual<PackageInfo>({
				label: 'Nodemon',
				dependencies: undefined,
				devDependencies: ['nodemon'],
				dev: true, /*Intentionally*/
				ts: false
			});
		});

		it('should create a package needing @types', ()=> {
			const result = PackageFactory.create('Express', undefined, { ts: true });
			expect(result).toEqual<PackageInfo>({
				label: 'Express',
				dependencies: ['express'],
				devDependencies: undefined,
				dev: false,
				ts: true
			});
		});

		it('should handle custom package string', ()=> {
			const result = PackageFactory.create('TypeScript', 'typescript ts-node @types/node', { dev: true });
			expect(result).toEqual<PackageInfo>({
				label: 'TypeScript',
				dependencies: undefined,
				devDependencies: ['typescript', 'ts-node', '@types/node'],
				dev: true,
				ts: false
			});
		});

		it('should handle custom object with dependencies & devDependencies', ()=> {
			const result = PackageFactory.create('Prisma', {
				dependencies: ['@prisma/client'],
				devDependencies: ['prisma']
			});
			expect(result).toEqual<PackageInfo>({
				label: 'Prisma',
				dependencies: ['@prisma/client'],
				devDependencies: ['prisma'],
				dev: false,
				ts: false
			});
		});
	});;

	describe('getAvailablePackages()', ()=> {
		it('should return a sorted list of PackageInfo', ()=> {
			const result = PackageFactory.getAvailablePackages();
			expect(Array.isArray(result)).toBe(true);
			expect(result[0].label <= result[1].label).toBe(true); /* Sorted alphabetically */
		});

		it('should include common packages like TypeScript & Express', ()=> {
			const labels = PackageFactory.getAvailablePackages().map(pkg=> pkg.label);
			expect(labels).toContain('TypeScript');
			expect(labels).toContain('Express');
		});
	});
});
