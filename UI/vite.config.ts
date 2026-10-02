import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function crestronEntryScript(): Plugin {
  return {
    name: 'crestron-entry-script',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          '<script type="module" crossorigin',
          '<script defer',
        )
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), crestronEntryScript()],
})
