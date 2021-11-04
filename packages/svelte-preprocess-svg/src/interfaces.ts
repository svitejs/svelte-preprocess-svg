export interface SvgTransform {
	name: string;
	// eslint-disable-next-line no-unused-vars
	transform: (svg: string) => string | Promise<string>;
}
export interface ParsedSvg {
	svg: string;
	start: number;
	end: number;
}

export interface PreprocessorInput {
	content: string;
	filename: string;
}

export interface SveltePreprocessSvgOptions {
	/**
	 * Filter function to only include some files
	 *
	 * @param {PreprocessorInput} input - filename and content of the file to process
	 * @return boolean true to include the file
	 */
	// eslint-disable-next-line no-unused-vars
	include?: (input: PreprocessorInput) => boolean;

	/**
	 * Filter function to exclude some files
	 *
	 * @param {PreprocessorInput} input - filename and content of the file to process
	 * @return boolean true to exclude the file
	 */
	// eslint-disable-next-line no-unused-vars
	exclude?: (input: PreprocessorInput) => boolean;

	/**
	 * Array of transformers to apply.
	 * name: unique name of the transform - this is passed to skipTransform
	 * transform: function to manipulate svg
	 *
	 */
	// eslint-disable-next-line no-unused-vars
	transforms?: SvgTransform[];

	/**
	 * enable svgo transform, use object for custom svgo options
	 *
	 * requires svgo to be installed as devDependency
	 */
	svgo?: boolean | object;

	/**
	 * do not wrap svg content in {@html ``}
	 */
	disableAtHtml?: boolean;

	/**
	 * skip a transform by name
	 * @param {PreprocessorInput} input - filename and content of the file to process
	 * @param {string} transform - name of the transform
	 * @param {string} svg - the svg to transform (previous transforms are already applied!)
	 */
	// eslint-disable-next-line no-unused-vars
	skipTransform?: (input: PreprocessorInput, transform: string, svg: string) => boolean;

	/**
	 * Set to true to use a simple string search instead of svelte.parse.
	 * This is faster but not fault tolerant. misaligned html comments or svg inside string literals will trip it up
	 */
	useSimpleStringParser?: boolean;
}
