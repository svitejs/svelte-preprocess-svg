import MagicString from 'magic-string';

// eslint-disable-next-line node/no-missing-import
import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';
import { PreprocessorInput, SveltePreprocessSvgOptions } from './interfaces';
import { createAtHtmlTransform } from './transforms/at-html';
import { createSvgoTransform } from './transforms/svgo';
import { stringParse } from './parsers/string-parse';
import { svelteParse } from './parsers/svelte-parse';

const RESERVED_TRANSFORM_NAMES = ['svgo', '@html'];

function skip(input: PreprocessorInput, options?: SveltePreprocessSvgOptions) {
	if (options?.include && !options.include(input)) {
		return true;
	}
	if (options?.exclude && options.exclude(input)) {
		return true;
	}
	if (!input.content.includes('<svg ')) {
		return true;
	}
}

function createTransforms(options?: SveltePreprocessSvgOptions) {
	const transforms = options?.transforms || [];
	for (const reserved of RESERVED_TRANSFORM_NAMES) {
		if (transforms.some((x) => x.name === reserved)) {
			throw new Error(`transform name "${reserved}" is reserved for internal use`);
		}
	}
	if (options?.svgo) {
		transforms.push(createSvgoTransform(options.svgo));
	}
	if (!options?.disableAtHtml) {
		transforms.push(createAtHtmlTransform());
	}

	return transforms;
}

export function sveltePreprocessSvg(
	options?: SveltePreprocessSvgOptions
): Pick<PreprocessorGroup, 'markup'> {
	const transforms = createTransforms(options);
	return {
		// @ts-ignore
		markup: async (input) => {
			if (skip(input, options)) {
				return;
			}
			const parsedSvgs = options?.useSimpleStringParser ? stringParse(input) : svelteParse(input);
			if (!parsedSvgs?.length) {
				return;
			}
			const s = new MagicString(input.content);
			for (const parsedSvg of parsedSvgs) {
				let svg = parsedSvg.svg;
				for (const transform of transforms) {
					if (!options?.skipTransform?.(input, transform.name, svg)) {
						const result = await transform.transform(svg);
						if (result != null) {
							svg = result;
						}
					}
				}
				s.overwrite(parsedSvg.start, parsedSvg.end, svg);
			}
			return {
				code: s.toString(),
				map: s.generateDecodedMap({ source: input.filename, hires: true })
			};
		}
	};
}
