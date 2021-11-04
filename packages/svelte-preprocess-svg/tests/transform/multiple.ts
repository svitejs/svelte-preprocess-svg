import { test } from 'uvu';
import * as path from 'path';
import { promises as fs } from 'fs';
import { sveltePreprocessSvg } from '../../src/index.js';
import * as assert from 'uvu/assert';

test('svgo-transform', async () => {
	const filename = path.resolve('tests/fixtures/multiple.svelte');
	const content = await fs.readFile(filename, 'utf-8');
	const preprocess = await sveltePreprocessSvg({
		svgo: true,
		transforms: [
			{
				name: 'custom',
				transform: (svg) => svg.replace('green', 'red')
			}
		]
	});
	const result = await preprocess.markup({ content, filename });
	const expected = await fs.readFile(filename + '.expected', 'utf-8');
	assert.fixture(result.code, expected);
});

test.run();
