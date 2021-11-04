import { test } from 'uvu';
import * as path from 'path';
import { promises as fs } from 'fs';
import { sveltePreprocessSvg } from '../../src/index.js';
import * as assert from 'uvu/assert';

test('include', async () => {
	const filename = path.resolve('tests/fixtures/strict.svelte');
	const content = await fs.readFile(filename, 'utf-8');
	const preprocess = await sveltePreprocessSvg({
		include: ({ filename }) => {
			return filename.includes('strict.svelte');
		}
	});
	const result = await preprocess.markup({ content, filename });
	assert.type(result, 'object');
	const result2 = await preprocess.markup({ content, filename: 'some/other/file.svelte' });
	assert.type(result2, 'undefined');
});

test('exclude', async () => {
	const filename = path.resolve('tests/fixtures/strict.svelte');
	const content = await fs.readFile(filename, 'utf-8');
	const preprocess = await sveltePreprocessSvg({
		exclude: ({ filename }) => {
			return filename.includes('strict.svelte');
		}
	});
	const result = await preprocess.markup({ content, filename });
	assert.type(result, 'undefined');
	const result2 = await preprocess.markup({ content, filename: 'some/other/file.svelte' });
	assert.type(result2, 'object');
});

test.run();
