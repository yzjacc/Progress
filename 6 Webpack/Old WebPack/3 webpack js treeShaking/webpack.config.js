const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const path = require('path');
module.exports = {
    plugins: [
        new WebpackDeepScopeAnalysisPlugin(),
    ]
}