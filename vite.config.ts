import { defineConfig } from 'vite'
import {defineConfig as defineVitestConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
const viteConfig = defineConfig({
  plugins: [react(),svgr()],
})
const vitestConfig = defineVitestConfig({
  test:{environment:"jsdom"}
})
export default {...viteConfig,...vitestConfig}