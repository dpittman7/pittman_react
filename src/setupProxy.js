const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/project",
    "/api/about",
    "/api/openAI"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: "http://api:5000",
        secure: false,
        changeOrigin: true
    });

    app.use(appProxy);
};
