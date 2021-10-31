import MagicString from 'magic-string';

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

// escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
function escapeSvelte(str: string): string {
	return str
		.replace(/{/g, '&#123;')
		.replace(/}/g, '&#125;')
		.replace(/`/g, '&#96;')
		.replace(/\\([trn])/g, ' ');
}

export default function () {
	return {
		// @ts-ignore
		markup: ({ content, filename }) => {
			const s = new MagicString(content);
			let svg = nextSvg(content);
			if (!svg) {
				return;
			}
			while (svg) {
				s.overwrite(
					svg.openTagEnd,
					svg.closeTagStart,
					`{@html \`${escapeSvelte(content.slice(svg.openTagEnd, svg.closeTagStart))}\`}`
				);
				svg = nextSvg(content, svg.closeTagEnd + 1);
			}

			return {
				code: s.toString(),
				map: s.generateDecodedMap({ source: filename, hires: true })
			};
		}
	};
}
