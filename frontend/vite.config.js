import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());  

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react()],
    server: {
      port:3000,
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL,
          changedOrigin: true
        }
      }
    },
  })
}

