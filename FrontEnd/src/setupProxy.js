const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5182', // Backend URL
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // Strips "/api" prefix
    })
  );
};
