# @himenon/sharp-to-markdown-link

Replace numbers starting with # with markdown links

## Usage

**Install**

```bash
npm  install @himenon/sharp-to-markdown-link
yarn add     @himenon/sharp-to-markdown-link
pnpm install @himenon/sharp-to-markdown-link
```

**API**

```ts
import { sharpToMdLink } from "@himenon/sharp-to-markdown-link";

sharpToMdLink("https://example.com/pull", "#123");
// => [#123](https://example.com/pull/123)

sharpToMdLink("https://example.com/pull", "#123 #124 #125");
// => [#123](https://example.com/pull/123) [#124](https://example.com/pull/124) [#125](https://example.com/pull/125)
```

## Release

- Automatic version updates are performed when merged into the `main` branch.

## LICENCE

[@Himenon/sharp-to-markdown-link](https://github.com/Himenon/template-esm-js)・MIT
