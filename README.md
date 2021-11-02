# @svitejs/svelte-preprocess-svg

[![npm version](https://img.shields.io/npm/v/@svitejs/svelte-preprocess-svg)](https://www.npmjs.com/package/@svitejs/svelte-preprocess-svg)
[![CI](https://github.com/svitejs/svelte-preprocess-svg/actions/workflows/ci.yml/badge.svg)](https://github.com/svitejs/svelte-preprocess-svg/actions/workflows/ci.yml)

Optimize inline svg in svelte components

## Features

- wrap content of `<svg>` in `@html` directive so that the svelte compiler treats it as string instead of generating an extra function call for each childnode.

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
