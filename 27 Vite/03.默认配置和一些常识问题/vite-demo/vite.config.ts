import { defineConfig,ConfigEnv,UserConfig } from 'vite'
import path from 'path'

export default defineConfig(({command, mode}: ConfigEnv):UserConfig => { 
  console.log(command);
  console.log(mode);

  return {
    server: {
      port: 3000,
      open: true,
    }
  }
})