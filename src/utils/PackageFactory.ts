import { PackageInfo } from '../types';

export class PackageFactory {
	static create(label: string, pkg?: string | { dependencies?: string[]; devDependencies?: string[]; }, opts?: { dev?: boolean; ts?: boolean; }): PackageInfo {
		const isString = typeof pkg === 'string';
		if(!isString && pkg){
			return {
				label,
				dependencies: pkg.dependencies,
				devDependencies: pkg.devDependencies,
				dev: opts?.dev ?? false,
				ts: opts?.ts ?? false
			};
		}

		const packageNames = pkg ? pkg.split(' ') : [label.toLowerCase()];
		return {
			label,
			dependencies: opts?.dev ? undefined : packageNames,
			devDependencies: opts?.dev ? packageNames : undefined,
			dev: opts?.dev ?? false,
			ts: opts?.ts ?? false
		}
	}

	static getAvailablePackages(): PackageInfo[] {
		const packages: PackageInfo[] = [
			// ⚙️ Core Dev Tools
			this.create('TypeScript', 'typescript ts-node @types/node', { dev: true }),
			this.create('Nodemon', undefined, { dev: true }),
			this.create('ESLint', undefined, { dev: true }),
			this.create('Prettier', undefined, { dev: true }),
			this.create('Husky', undefined, { dev: true }),
			this.create('lint-staged', undefined, { dev: true }),
			this.create('cross-env', undefined, { dev: true }),
			this.create('concurrently', undefined, { dev: true }),
			this.create('tsconfig-paths', undefined, { dev: true }),
			// 🧪 Testing
			this.create('Jest', 'jest ts-jest @types/jest', { dev: true }),
			this.create('Vitest', undefined, { dev: true }),
			this.create('Supertest', undefined, { dev: true, ts: true }),
			this.create('Superagent', undefined, { dev: true }),
			// 📦 Common Libraries
			this.create('Yargs', undefined, { ts: true }),
			this.create('dotenv', undefined, { ts: true }),
			this.create('uuid', undefined, { ts: true }),
			this.create('validator', undefined, { ts: true }),
			this.create('zod'),
			this.create('class-validator'),
			this.create('dayjs'),
			// 🔥 Server
			this.create('Express', undefined, { ts: true }),
			this.create('express-validator'),
			this.create('express-rate-limit'),
			this.create('CORS', undefined, { ts: true }),
			this.create('Compression', undefined, { ts: true }),
			this.create('Helmet'),
			this.create('HPP', undefined, { ts: true }),
			this.create('Morgan', undefined, { ts: true }),
			this.create('cookie-parser', undefined, { ts: true }),
			// 🔐 Auth
			this.create('JSON Web Token', 'jsonwebtoken', { ts: true }),
			this.create('Passport'),
			this.create('Passport JWT', 'passport-jwt', { ts: true }),
			this.create('Bcrypt', undefined, { ts: true }),
			this.create('BcryptJS', undefined, { ts: true }),
			// 📬 Communication
			this.create('Nodemailer', undefined, { ts: true }),
			// ⚡ Realtime
			this.create('Socket.IO'),
			this.create('Socket.IO Client', 'socket.io-client'),
			// 🗃️ DB / ORM / ODM
			this.create('MySql', 'mysql2'),
			this.create('postgreSQL', 'pg'),
			this.create('Redis', 'ioredis'),
			this.create('Prisma', {
			  dependencies: ['@prisma/client'],
			  devDependencies: ['prisma']
			}),
			this.create('Mongoose', undefined, { ts: true }),
			this.create('TypeORM', 'typeorm reflect-metadata'),
			// 🔗 Networking / Requests
			this.create('Axios', undefined, { ts: true }),
			this.create('formidable', undefined, { ts: true }),
			// 🧰 Utilities
			this.create('fs-extra'),
			this.create('rimraf', undefined, { ts: true }),
			this.create('Multer', undefined, { ts: true }),
			// 📚 Documentation
			this.create('Swagger', 'swagger-jsdoc swagger-ui-express', { ts: true }),
		];
		return packages.sort((a, b)=> a.label.localeCompare(b.label));
	}
}
