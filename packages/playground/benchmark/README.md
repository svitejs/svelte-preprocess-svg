# benchmark for svelte-preprocess-svg

App.svelte uses all svelte-feather-icon svgs.

run `pnpm run benchmark` to build it without and with svelte-preprocess-svg.

output is in dist/regular and dist/svg

example:

```shell
# regular
vite v2.6.13 building for production...
✓ 293 modules transformed.
dist/regular/index.html                  0.47 KiB
dist/regular/assets/index.82118662.js    2.17 KiB / gzip: 1.13 KiB
dist/regular/assets/index.cc22df50.css   0.09 KiB / gzip: 0.10 KiB
dist/regular/assets/vendor.332709fc.js   320.29 KiB / gzip: 27.46 KiB

# with svelte-preprocess-svg
vite v2.6.13 building for production...
✓ 293 modules transformed.
dist/svg/index.html                  0.47 KiB
dist/svg/assets/index.6868e2bd.js    2.17 KiB / gzip: 1.13 KiB
dist/svg/assets/index.cc22df50.css   0.09 KiB / gzip: 0.10 KiB
dist/svg/assets/vendor.2dddde27.js   289.62 KiB / gzip: 21.23 KiB
```
