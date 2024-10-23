# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## 依赖包

### vite

```shell
npm create vite@latest
```

#### vite 相关打包依赖

```shell
npm install -D rollup-plugin-external-globals
npm install terser --save-dev
npm install unplugin-vue-components -D
npm install -D less
npm install @vitejs/plugin-vue-jsx -D
npm install  @types/node --save-dev
```

### @vueuse/core

```shell
npm install @vueuse/core
```

### pinia

```shell
npm install pinia
```

### ant-design-vue4.x

```shell
npm i --save ant-design-vu0.5e@4.x
```

### vue-router@4

```shell
npm install vue-router@4
```

### tailwind.css

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### icons

```shell
npm install @icon-park/vue-next --save
```

### 倒计时动画
```shell
npm i vue-countup-v3
```

### 五彩缤纷的纸屑礼花
```shell
npm install --save canvas-confetti
```

 



## 注意事项

### vite 没生效

1. 如果是配置了 postcss.config.js tailwind.css.js main.css
但是还没生效，有可能是因为里面有些文件使用了 commonjs 语法

2. store不能解构赋值


# 代办优化项:
1.tagSelect如果过长需要做tooltip显示

2.文档改成知识，就是说给用户解放方案相关的检索
3.要做宣传
3.引导用户去使用，比如xx告警没有总结成知识
4.文档修改日志功能
6.权限管理可能要跟上
5.确认原有的逻辑，如何进行操作


[x]1.添加requestholder的超时重试
[ ]2.列表页使用表格来做










