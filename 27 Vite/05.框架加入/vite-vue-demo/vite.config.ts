import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite'
import { wrapperEnv } from './build/getEnv.ts'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({command, mode}: ConfigEnv):UserConfig => { 
  // console.log(command);
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
    esbuild: {
      pure:viteEnv.VITE_DROP_CONSOLE ? ['console.log','debugger'] : []
    }
  }
})