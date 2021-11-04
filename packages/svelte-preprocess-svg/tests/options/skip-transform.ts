import { test } from 'uvu';
import * as path from 'path';
import { promises as fs } from 'fs';
import { sveltePreprocessSvg } from '../../src/index.js';
import * as assert from 'uvu/assert';

test('skip-transform', async () => {
	const filename = path.resolve('tests/fixtures/multiple.svelte');
	const content = await fs.readFile(filename, 'utf-8');
	const preprocess = await sveltePreprocessSvg({
		svgo: true,
		transforms: [
			{
				name: 'custom',
				transform: (svg) => svg.replace('green', 'red')
			}
		],
		skipTransform: () => true
	});
	const result = await preprocess.markup({ content, filename });

	assert.fixture(result.code, content);
});

test.run();
