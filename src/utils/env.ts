const { NODE_ENV } = process.env;

export const Env = {
	isDev: NODE_ENV === 'dev',
	isProd: NODE_ENV === 'production',
};
