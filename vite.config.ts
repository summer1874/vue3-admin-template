import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 提供 Vue 3 单文件组件支持
// Vue按需组件自动导入 插件会生成一个自己组件路径的components.d.ts文件
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers' // 从 AntDesign UI库导入
import AutoImport from 'unplugin-auto-import/vite' // vue3等插件 hooks 自动引入
import * as path from 'path'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import' // message, notification 等非组件模块引入样式自动引入
import eslintPlugin from 'vite-plugin-eslint'

const PORT: number = 5233
const resolve = (dir: string) => path.join(__dirname, dir)

// Components dir
const componentsDirs = resolve('src/components')
const componentsDts = resolve('src/components.d.ts')

// AutoImport dir
const antNonComponentModule = resolve('src/composables/ant-non-component-module')
const autoImportDts = resolve('src/auto-import.d.ts')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  // 需要用到的插件数组。
  plugins: [
    eslintPlugin(),
    vue(),
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()]
    }),
    Components({
      dirs: [componentsDirs], // 指定组件位置，默认是src/components
      extensions: ['vue'],
      dts: componentsDts, // 配置文件生成位置
      resolvers: [AntDesignVueResolver()] // 自定义组件的解析器
    }),
    AutoImport({
      imports: [
        'vue',
        {
          [antNonComponentModule]: [['$message', 'antMessage']]
        },
        {
          [antNonComponentModule]: [['$notification', 'antNotification']]
        }
      ],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: autoImportDts, // 配置文件生成位置
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    })
  ],
  server: {
    port: PORT, // 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口。
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  }
})
