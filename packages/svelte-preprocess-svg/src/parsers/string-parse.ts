import { ParsedSvg, PreprocessorInput } from '../interfaces';

export function stringParse(input: PreprocessorInput): ParsedSvg[] {
	const result: ParsedSvg[] = [];
	let pos = 0;
	let svg;
	while ((svg = nextSvg(input.content, pos)) != null) {
		result.push(svg);
		pos = svg.end;
	}
	return result;
}

function nextSvg(content: string, pos: number = 0) {
	const start = content.indexOf('<svg ', pos);
	if (start < 0) {
		return;
	}

	const closeTagStart = content.indexOf('</svg', start);
	if (closeTagStart < 0) {
		return;
	}
	const end = content.indexOf('>', closeTagStart + 5);
	if (end < 0) {
		return;
	}
	return {
		start,
		end,
		svg: content.slice(start, end)
	};
}
