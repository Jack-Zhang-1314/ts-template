# ts-template

This template should help get you started developing with Vue 3 in Vite.

## Project Setup

```sh
npm install && npm run husky
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

### prettier

> 规范代码风格

```sh
pnpm run prettier
```

### commit

>规范所有提交风格

```sh
pnpm run commit
```

1. 可以使用自定义的提交风格在`.cz-config.js`中配置
   * 这里需要下载`pnpm add cz-customizable -D`

   ```json
   "config": {
     "commitizen": {
       "path":"./node_modules/cz-customizable"
     }
   }
   ```

2. 或者可以使用传统的提交风格
   * 这里需要下载`pnpm add cz-conventional-changelog -D`

   ```json
   "config": {
     "commitizen": {
       "path": "./node_modules/cz-conventional-changelog"
     }
   }
   ```

### version

> 查看每次版本更迭信息

```sh
pnpm run version
```
