# Dotenv Extract

🏡 Type-check & parse dotenv files the right way

## Installation

```bash
npm i -D dotenv-extract
pnpm i -D dotenv-extract
yarn add -D dotenv-extract
```

## Setup

Create a `dotenv.ts` file at the root of your project:

```ts
import extract from 'dotenv-extract'

export const YOUR_DOTENV_VARIABLE = extract({
  // (Required) Name of your variable in .env files
  name: "YOUR_DOTENV_VARIABLE",
  // Use globs patterns to parse & typecheck your env
  patterns: ["YES", "N0", "1", "0"]
  // You can set it optional to prevent to throw errors at node runtime
  optional: true,
  // If exact is set to true, extract will throw an error if variable doesn't match
  exact: true
})
```


## Usages

### Expand and Flow

`dotenv-extract` use [`dotenv-flow`](https://github.com/kerimdzhanov/dotenv-flow) and [`dotenv-expand`](https://github.com/motdotla/dotenv-expand)

### Monorepos

This lib was developed primarily on Nx monorepo, but can also be use on other.

Please, create an issue if you see bug, I will fix it asap.
