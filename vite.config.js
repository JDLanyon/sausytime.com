import { defineConfig } from 'vite'

const rewriteSlashToIndexHtml = () => {
  return {
    name: 'rewrite-slash-to-index-html',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      // rewrite / as index.html
      server.middlewares.use('/', (req, res, next) => {
        if (req.url === '/') {
          req.url = '/index.html'
        }
        console.log(req.url)
        console.log(res.url)
        next()
      })
    },
  }
}

export default defineConfig({
  appType: 'mpa', // disable history fallback
  plugins: [
    rewriteSlashToIndexHtml(),
  ],
})