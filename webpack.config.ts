import * as htmlPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { Configuration, HotModuleReplacementPlugin, Rule } from 'webpack';
import { PORT } from './src/config';
import { Env } from './src/utils';

function Root(...paths: string[]) {
	return path.join(__dirname, ...paths);
}

export const PublicPath = '/';

const Loaders: Rule[] = [
	{
		test: /.tsx?$/,
		use: ['awesome-typescript-loader'],
		exclude: ['node_modules'],
	},
];

export const Base: Configuration = {
	mode: 'none',

	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
};

export const Client: Configuration = {
	...Base,
	name: 'client',
	target: 'web',

	entry: {
		client: Root('src/client'),
	},

	output: {
		path: Root('dist'),
		publicPath: PublicPath,
		filename: Env.isDev ? '[name].js' : '[name].[hash:8].js',
		chunkFilename: Env.isDev ? '[name].chunk.js' : '[name].[hash:8].chunk.js',
	},

	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				'vendors': {
					test: chunk => (
						chunk.resource &&
						/\.js$/.test(chunk.resource) &&
						/node_modules/.test(chunk.resource)
					),
					chunks: 'initial',
					name: 'vendors',
					priority: 1,
				},
				'async-vendors': {
					test: /[\\/]node_modules[\\/]/,
					minChunks: 2,
					chunks: 'async',
					name: 'async-vendors',
				},
			},
		},
		runtimeChunk: {
			name: 'runtime',
		},
	},

	devServer: {
		contentBase: Root('build'),
		compress: true,
		port: PORT,
		hot: true,
		inline: true,
		historyApiFallback: true,
		publicPath: '/',
		host: '0.0.0.0',
		disableHostCheck: true,
	},

	module: {
		rules: [
			...Loaders,
		],
	},

	plugins: [
		new htmlPlugin({
			filename: 'index.html',
			template: './src/index.html',
		}),

		...(Env.isDev ? [
			new HotModuleReplacementPlugin(),
		] : [

			]),
	],
};

export default [Client];
