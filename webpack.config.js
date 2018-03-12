const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ["style-loader", {
                        loader: "css-loader",
                        options: {url: false}
                    }
                    , "less-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'css', 'less'],
        modules: [
            'node_modules'
        ] 
    },
};
