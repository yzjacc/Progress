import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import { wrapperEnv } from './build/getEnv.ts'
import vue from '@vitejs/plugin-vue'
import presetEnv from 'postcss-preset-env'
import path from 'path'

export default defineConfig(({command, mode}: ConfigEnv):UserConfig => { 
  console.log(command);
  // console.log(mode);

  // console.log(__dirname)
  // console.log(process.cwd())

  const root = process.cwd();

  // 默认读取node环境变量
  // console.log(process.env)
  // mode 表示当前情景 root表示项目根路径，'' 表示前缀，''默认读取所有的环境变量
  const env = loadEnv(mode, root, 'VITE_')
  console.log(env);

  // const { VITE_PORT, VITE_OPEN } = env;
  // const port  = Number(VITE_PORT) || 3000;
  // const open  = Boolean(VITE_OPEN) || true;
  const viteEnv = wrapperEnv(env);

  return {
    root,
    plugins: [vue()],
    server: {
      port:viteEnv.VITE_PORT,
      open:viteEnv.VITE_OPEN
    },
    // esbuild: {
    //   pure:viteEnv.VITE_DROP_CONSOLE ? ['console.log','debugger'] : []
    // },
    resolve: {
      alias: {
        '@':path.resolve(__dirname, './src')
      }
    },
    optimizeDeps: {
      exclude:['lodash-es']
    },
    css: {
      preprocessorOptions: {
        scss: {
          //注意最后要加上分号;
          additionalData: `@import "./src/styles/var.scss";`
        }
      },
      modules: {
        // name 表示当前文件名，local 表示当前类名，hash 表示hash值
        generateScopedName: '[name]_[local]_[hash:base64:5]'
      },
      postcss: {
        plugins: [
          presetEnv({
            browsers: ['last 2 versions', '> 1%', 'IE 11'],
            autoprefixer: { grid: true } 
          })
        ]
      }
    }
  }
})