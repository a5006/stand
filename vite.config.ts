import vue from '@vitejs/plugin-vue';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { type PluginOption, defineConfig } from 'vite';
import externalGlobals from 'rollup-plugin-external-globals';
import Components from 'unplugin-vue-components/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// import { splitVendorChunkPlugin } from "vite";
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

const ifInclude = (s: string, ...params: string[]) => {
  for (let i of params) {
    if (s.includes(i)) {
      return true;
    }
  }
  return false;
};
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // splitVendorChunkPlugin(),
    createSvgIconsPlugin({
      // 图标文件夹为src/assets/icons
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    Components({
      // dirs: ['src'],
      // extensions: ['vue', 'tsx', 'jsx'],
      // deep: true,
      // dts: false,
      // directives: true,
      // include: [/.vue$/, /.vue?vue/],
      // exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    }),
    {
      name: 'console',
      configResolved(config) {
        console.log("🚀 Project is Running!! Power by Silan's Coding Skill");
      }
    }
  ],

  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages') }
    ]
  },

  build: {
    minify: 'terser', // 使用 terser 插件来压缩构建输出
    sourcemap: false, // 生产环境是否生成 source map
    rollupOptions: {
      external: ['echarts'],
      plugins: [
        externalGlobals({
          echarts: 'echarts'
        }) as any
      ],
      output: {
        manualChunks(id: string) {
          // the most important information is here:
          // 1.Automatically generate build bundles,and identify both small and large library&modules
          // 2.declare the larger name,and the smaller one will be  built into one bundle
          if (ifInclude(id, 'node_modules')) {
            const name = id.toString().split('node_modules/')[1];
            if (ifInclude(name, 'vue', '@vue')) {
              return '@vue';
            }
            if (ifInclude(name, 'ant-design-vue', '@ant-design')) {
              return '@ant-design';
            }
            if (ifInclude(name, '@tinymce', 'tinymce')) {
              return '@tinymce';
            }
            if (ifInclude(name, 'highlight.js')) {
              return '@highlight.js';
            }
            return 'power-code';
          }

          // creating a chunk to react routes deps. Reducing the vendor chunk size
          // if (id.includes("node_modules")) {
        }
      } // 在此处使用类型断言告诉 TypeScript，output 具有 chunkSizeWarningLimit 属性
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api/v1': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:2334',
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1')
      }
    }
  }
});
