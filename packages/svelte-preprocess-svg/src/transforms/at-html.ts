import { SvgTransform } from '../interfaces';

// escape curlies, backtick, \t, \r, \n to avoid breaking of {@html `here`} in .svelte
function escapeForAtHtml(str: string): string {
	return str
		.replace(/{/g, '&#123;')
		.replace(/}/g, '&#125;')
		.replace(/`/g, '&#96;')
		.replace(/\\([trn])/g, ' ');
}

function atHtml(svg: string): string {
	const contentStart = svg.indexOf('>') + 1;
	const contentEnd = svg.lastIndexOf('<');
	return (
		svg.slice(0, contentStart) +
		'{@html `' +
		escapeForAtHtml(svg.slice(contentStart, contentEnd)) +
		'`}' +
		svg.substring(contentEnd)
	);
}

export function createAtHtmlTransform(): SvgTransform {
	return {
		name: '@html',
		transform: atHtml
	};
}
