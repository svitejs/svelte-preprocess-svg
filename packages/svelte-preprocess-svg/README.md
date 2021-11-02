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
interface SveltePreprocessSvgOptions {
	/**
	 * Filter function to only include some files
	 *
	 * @param filename
	 * @param content
	 * @return boolean true to include the file
	 */
	// eslint-disable-next-line no-unused-vars
	include?: (filename: string, content?: string) => boolean;

	/**
	 * Filter function to exclude some files
	 *
	 * @param filename
	 * @param content
	 * @return boolean true to exclude the file
	 */
	// eslint-disable-next-line no-unused-vars
	exclude?: (filename: string, content?: string) => boolean;

	/**
	 * Set to true to use a simple string search instead of svelte.parse.
	 * This is faster but not fault tolerant. misaligned html comments or svg inside string literals will trip it up
	 */
	useSimpleStringParser?: boolean;
}
```

## License

[MIT](./LICENSE)
