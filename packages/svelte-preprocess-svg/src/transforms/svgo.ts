import { SvgTransform } from '../interfaces';
export function createSvgoTransform(options: object | boolean): SvgTransform {
	let svgo: any = null;
	let config: any;
	return {
		name: 'svgo',
		transform: async (svg: string) => {
			// lazy init svgo
			if (svgo === null) {
				try {
					svgo = await import('svgo');
				} catch (e) {
					console.error('failed to import "svgo". Please install it', e);
					throw e;
				}
				try {
					config = options === true ? await svgo.loadConfig() : options;
				} catch (e) {
					console.error('failed to load svgo config', e);
					throw e;
				}
			}

			try {
				const result = await svgo.optimize(svg, config);
				return result.data;
			} catch (e) {
				console.error('svgo failed', e);
				return svg;
			}
		}
	};
}
