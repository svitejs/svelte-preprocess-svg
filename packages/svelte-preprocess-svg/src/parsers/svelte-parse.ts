import { parse, walk } from 'svelte/compiler';
import { ParsedSvg, PreprocessorInput } from '../interfaces';

export function svelteParse(input: PreprocessorInput): ParsedSvg[] {
	const parsed = parse(input.content, { filename: input.filename });
	const result: ParsedSvg[] = [];
	walk(parsed.html, {
		enter: function (node: any) {
			if (node.type === 'Element' && node.name === 'svg') {
				const { start, end } = node;
				const svg = input.content.slice(start, end);
				result.push({
					start,
					end,
					svg
				});
				this.skip();
			}
		}
	});
	return result;
}
