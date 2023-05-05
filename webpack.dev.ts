const npath = require('path')

module.exports = {
  resolve: {
    alias: {
      '@/': npath.resolve(__dirname, "src")
    }
  }
}
