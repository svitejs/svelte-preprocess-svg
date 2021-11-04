# @svitejs/svelte-preprocess-svg

Optimize inline svg in svelte components

## Installation

```bash
npm install --save-dev @svitejs/svelte-preprocess-svg
```

## Usage

svelte.config.js

```js
import { sveltePreprocessSvg } from '@svitejs/svelte-preprocess-svg';
//...
export default {
	//...
	preprocess: [
		//...
		// sveltePreprocessSvg must be used AFTER other markup preprocessors like mdsvex
		sveltePreprocessSvg({
			/* options */
		})
	]
	//...
};
```

## Documentation

### options

```ts
export interface SveltePreprocessSvgOptions {
	/**
	 * Filter function to only include some files
	 *
	 * @param {PreprocessorInput} input - filename and content of the file to process
	 * @return boolean true to include the file
	 */
	include?: (input: PreprocessorInput) => boolean;

	/**
	 * Filter function to exclude some files
	 *
	 * @param {PreprocessorInput} input - filename and content of the file to process
	 * @return boolean true to exclude the file
	 */
	exclude?: (input: PreprocessorInput) => boolean;

	/**
	 * Array of transformers to apply.
	 * name: unique name of the transform - this is passed to skipTransform
	 * transform: function to manipulate svg
	 *
	 */
	transforms?: SvgTransform[];

	/**
	 * enable svgo transform, use object for custom svgo options.
	 * Without custom options it tries to load svgo config or uses defaults
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
	skipTransform?: (input: PreprocessorInput, transform: string, svg: string) => boolean;

	/**
	 * Set to true to use a simple string search instead of svelte.parse.
	 * This is faster but not fault tolerant. misaligned html comments or svg inside string literals will trip it up
	 */
	useSimpleStringParser?: boolean;
}
```

## License

[MIT](./LICENSE)
