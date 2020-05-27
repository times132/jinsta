const path = require('path')

module.exports = {
    outputDir: path.resolve(__dirname, "../" + "main/resources/static"),
    devServer: {
        proxy: {
            '/user': {
                target: 'http://localhost:8000',
                ws: true,
                changeOrigin: true
            }
        }
    }
}