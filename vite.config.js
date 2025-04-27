import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
      target: 'http://localhost:4000', // 백엔드 서버 주소
      changeOrigin: true,
      secure: false, // 개발 환경에서 보안 설정
    },
  },
});

