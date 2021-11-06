import { test } from 'uvu';
import * as path from 'path';
import { promises as fs } from 'fs';
import { sveltePreprocessSvg } from '../../src/index.js';
import { svelteParse } from '../../src/parsers/svelte-parse.js';
import { stringParse } from '../../src/parsers/string-parse.js';
import * as assert from 'uvu/assert';

test('string-parse result', async () => {
	const filename = path.resolve('tests/fixtures/simple.svelte');
	const content = await fs.readFile(filename, 'utf-8');
	const preprocess = await sveltePreprocessSvg({ useSimpleStringParser: true, svgo: true });
	const result = await preprocess.markup({ content, filename });
	const expected = await fs.readFile(filename + '.expected', 'utf-8');
	assert.fixture(result.code, expected);
});

test('string-parse equal', async () => {
	const filename = path.resolve('tests/fixtures/simple.svelte');
	const content = await fs.readFile(filename, 'utf-8');

	const parsed = stringParse({ filename, content });
	const parsedStrict = svelteParse({ filename, content });
	assert.equal(parsed, parsedStrict);
});

test.run();
