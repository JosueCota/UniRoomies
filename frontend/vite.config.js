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
          target: mode === "production" ? "https://api.myuniroomies.com": "http://localhost:8081",
          changedOrigin: true,
          secure: mode === "production",
        }
      }
    },
  })
}

