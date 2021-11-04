# @svitejs/svelte-preprocess-svg

[![npm version](https://img.shields.io/npm/v/@svitejs/svelte-preprocess-svg)](https://www.npmjs.com/package/@svitejs/svelte-preprocess-svg)
[![CI](https://github.com/svitejs/svelte-preprocess-svg/actions/workflows/ci.yml/badge.svg)](https://github.com/svitejs/svelte-preprocess-svg/actions/workflows/ci.yml)

Optimize inline svg in svelte components

## Features

- wrap svg content in `@html` to reduce component size
- svgo transform
- custom transforms
- include, exclude and skipTransform options

## Why

Inline svg - especially when they contain many nodes and attributes - can lead to pretty large compiler output with lots of function calls.
Wrapping the content of the svg in an `{@html content}` directive results in a single string variable inserted with innerHTML.

Check the compiler output in [this repl](https://svelte.dev/repl/b885420f332941f0b9cf47dc05f8ce88?version=3.44.1) for an example
and also the [benchmark playground project](packages/playground/benchmark), which is bundling all svelte-feather-icons.

| benchmark vendor.js bytes      | uncompressed | gzip  | brotli |
| ------------------------------ | ------------ | ----- | ------ |
| **regular**                    | 327975       | 27323 | 19420  |
| **with svelte-preprocess-svg** | 296567       | 21575 | 15991  |
| **delta**                      | -10%         | -21%  | -18%   |

## Caveats

The `@html` transform does not work with dynamic svg. It's useful for icons and other static svg that don't contain any svelte directives.
Dynamic attributes on the `<svg>` itself are ok.

## Documentation

[see here](packages/svelte-preprocess-svg/README.md)

## Packages

| Package                                                          | Changelog                                                |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| [@svitejs/svelte-preprocess-svg](packages/svelte-preprocess-svg) | [Changelog](packages/svelte-preprocess-svg/CHANGELOG.md) |

## Development

- `pnpm i` to install dependencies
- `pnpm dev` to run development build
- `pnpm test` to run tests
- `pnpm build` to run build

## License

[MIT](./LICENSE)
