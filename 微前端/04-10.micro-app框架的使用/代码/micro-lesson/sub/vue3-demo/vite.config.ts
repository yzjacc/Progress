import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve,join } from 'path';
import { writeFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  // 如果是生产环境使用自己的域名头，如果是开发环境“”，然后加上子应用的路由前缀
  base: `${process.env.NODE_ENV === 'production' ? 'http://my-site.com' : ''}/app-vite-demo/`,
  plugins: [
    vue(),
    //使用自定义插件：其实就是在打包的时候，将代码上的静态文件路径处理为绝对路径
    // 自定义插件
    (function () {
      let basePath = ''
      return {
        name: "vite:micro-app",
        apply: 'build',
        configResolved(config) {
          //${config.base} 项目的基础路径
          //${ config.build.assetsDir } //资源文件存放路径 assets
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        writeBundle(options, bundle) {
          //遍历所有代码块
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName]
              //找到文件名以.js结尾的代码块
              if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                //使用正则表达式查找所有的相对路径，然后使用new URL替换为绝对路径
                chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                  return all.replace($3, new URL($3, basePath))
                })
                const fullPath = join(options.dir, chunk.fileName)
                //将修改后的内容，重新写入到文件系统
                writeFileSync(fullPath, chunk.code)
              }
            }
          }
        },
      }
    })() as any,
  ],
  server: {
    port: 4003
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
})
