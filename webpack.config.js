const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const dist = path.resolve(__dirname, 'dist');


module.exports = {

    mode: 'development',
    devServer: {
        contentBase: dist,
        compress: false,
        port: 8080,
        historyApiFallback: true
    },
    entry: ['babel-polyfill', './src/Game.js'],
    output: {
        path: dist,
        filename: 'game.js'
    },
    devtool:'eval',
    resolve: {
        alias: {
            pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
            phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
            p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
            assets: path.join(__dirname, 'assets/')
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]',
                        // publicPath: '/'
                    }
                }
            },
            // { test: /assets(\/|\\)/, loader: 'file-loader?name=assets/[hash].[ext]' },
            { test: /pixi\.js$/, loader: 'expose-loader?PIXI' },
            { test: /phaser-split\.js$/, loader: 'expose-loader?Phaser' },
            { test: /p2\.js$/, loader: 'expose-loader?p2' },
        ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    plugins: [new HtmlWebpackPlugin({
        inject: true,
        template: 'public/index.html'
    }),
    new ZipPlugin({
        
        filename:'fbGame.zip'
    }),
    new WebpackCleanupPlugin()
]
};