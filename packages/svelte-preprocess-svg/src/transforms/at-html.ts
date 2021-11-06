import { SvgTransform } from '../interfaces';

function atHtml(svg: string): string {
	const contentStart = svg.indexOf('>') + 1;
	const contentEnd = svg.lastIndexOf('<');
	const openTag = svg.slice(0, contentStart);
	const content = svg.slice(contentStart, contentEnd);
	const closeTag = svg.substring(contentEnd);
	return `${openTag}{@html \`${content.replace(/`/g, '&#96;')}\`}${closeTag}`;
}

export function createAtHtmlTransform(): SvgTransform {
	return {
		name: '@html',
		transform: atHtml
	};
}
