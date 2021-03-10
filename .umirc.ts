import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  //路由动态加载
  dynamicImport: {
    loading: '@/components/loadding.tsx',
  },
  dva: {
    //启动dva热更新
    hmr: true,
    //启动immer模式,dva-immer
    immer: true,
  },
  antd: {},
  sass: {},
  //加入tailwindcss
  tailwindcss: {
    tailwindCssFilePath: '@/styles/tailwind.scss',
  },
});
