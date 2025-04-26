export interface PackageInfo {
	label: string; /* Display name (e.g. TypeScript, Prisma) */
	dependencies?: string[];
	devDependencies?: string[];
	dev?: boolean; /* Is it a -D dependency?? */
	ts?: boolean; /* Needs @types?? */
}
