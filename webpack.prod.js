/**
 * Created by jiangyu3 on 2017/7/18.
 */
const path = require('path');
const webpack = require('webpack');
const outputPath = path.resolve(__dirname, 'dist');
// const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    context: __dirname,
    resolve: {
        alias: {
            // tinymcePath: path.resolve(__dirname, tinymcePath),
            // comos$: path.resolve(__dirname, './src/lib/comos.js'),
            // tinymce$: path.resolve(__dirname, tinymcePath + '/tinymce.full.min'),
        },
        // extensions: [".js", ".json", '.css', 'jsx'],
        modules: [
            __dirname,
            'node_modules'
        ]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, 
                exclude: /(node_modules)/,
                loader: "babel-loader!awesome-typescript-loader"},
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?sourceMap!postcss-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader?sourceMap!postcss-loader!sass-loader',
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader?sourceMap!postcss-loader!less-loader',
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit: 8192,
                            prefix: 'img'
                        }
                    },
                    // 'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                    // 'file-loader'
                ]
            }
        ]
    },
    entry: {
        'document-check-list': 'documentCheck/ListApp.js',
        'document-check-audit': 'documentCheck/AuditApp.js',
        'img-match-list': 'imgMatch/DocListApp.js',
        'img-match-audit': 'imgMatch/AuditApp.js',
        vendor: ['react', 'react-dom', 'NavigatorApp', 'css/main.css']
    },
    output: {
        filename: '[name].min.js',
        chunkFilename: '[name].min.js',
        // chunkFilename: '[name].[chunkhash].js',
        path: outputPath
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            __Env: {
                PROD: true
            },
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // new ManifestPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,//美化代码
            mangle: {// js混淆
                screw_ie8: true,//clean ie8 related code
                keep_fnames: true//keep function name
            },
            sourceMap: true,
            compress: {
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            },
            comments: false
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new webpack.HashedModuleIdsPlugin(),//https://doc.webpack-china.org/plugins/hashed-module-ids-plugin
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // }),
    ]
};