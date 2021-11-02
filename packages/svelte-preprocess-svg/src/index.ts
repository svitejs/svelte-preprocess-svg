import MagicString from 'magic-string';
import { parse, walk } from 'svelte/compiler';
// eslint-disable-next-line node/no-missing-import
import { PreprocessorGroup } from 'svelte/types/compiler/preprocess';

export interface SveltePreprocessSvgOptions {
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

function skip(filename: string, content: string, options?: SveltePreprocessSvgOptions) {
	if (options?.include && !options.include(filename, content)) {
		return true;
	}
	if (options?.exclude && options.exclude(filename, content)) {
		return true;
	}
	if (!content.includes('<svg ')) {
		return true;
	}
}

function simpleStringTransform(filename: string, content: string) {
	let svg = nextSvg(content);
	if (!svg) {
		return;
	}
	const s = new MagicString(content);
	while (svg) {
		wrapSvgContent(s, svg.openTagEnd, svg.closeTagStart, content);
		svg = nextSvg(content, svg.closeTagEnd + 1);
	}
	return preprocessorOutput(s, filename);
}

function nextSvg(content: string, start: number = 0) {
	const openTagStart = content.indexOf('<svg ', start);
	if (openTagStart < 0) {
		return;
	}
	const openTagEnd = content.indexOf('>', openTagStart + 5) + 1;
	if (openTagEnd < 0) {
		return;
	}
	const closeTagStart = content.indexOf('</svg', openTagEnd);
	if (closeTagStart < 0) {
		return;
	}
	const closeTagEnd = content.indexOf('>', closeTagStart + 5);
	if (closeTagEnd < 0) {
		return;
	}
	return {
		openTagStart,
		openTagEnd,
		closeTagStart,
		closeTagEnd
	};
}

function strictParseTransform(filename: string, content: string) {
	const parsed = parse(content, { filename });
	const s = new MagicString(content);
	walk(parsed.html, {
		enter: function (node: any) {
			if (node.type === 'Element' && node.name === 'svg') {
				const openTagEnd = content.indexOf('>', node.start) + 1;
				const closeTagStart = content.lastIndexOf('</svg', node.end);
				wrapSvgContent(s, openTagEnd, closeTagStart, content);
				this.skip();
			}
		}
	});
	return preprocessorOutput(s, filename);
}

function wrapSvgContent(
	s: MagicString,
	openTagEnd: number,
	closeTagStart: number,
	content: string
) {
	s.overwrite(
		openTagEnd,
		closeTagStart,
		`{@html \`${escapeForAtHtml(content.slice(openTagEnd, closeTagStart))}\`}`
	);
}

// escape curlies, backtick, \t, \r, \n to avoid breaking of {@html `here`} in .svelte
function escapeForAtHtml(str: string): string {
	return str
		.replace(/{/g, '&#123;')
		.replace(/}/g, '&#125;')
		.replace(/`/g, '&#96;')
		.replace(/\\([trn])/g, ' ');
}

function preprocessorOutput(s: MagicString, filename: string) {
	return {
		code: s.toString(),
		map: s.generateDecodedMap({ source: filename, hires: true })
	};
}

export function sveltePreprocessSvg(
	options?: SveltePreprocessSvgOptions
): Pick<PreprocessorGroup, 'markup'> {
	return {
		// @ts-ignore
		markup: ({ filename, content }) => {
			if (skip(filename, content, options)) {
				return;
			}
			return options?.useSimpleStringParser
				? simpleStringTransform(filename, content)
				: strictParseTransform(filename, content);
		}
	};
}
