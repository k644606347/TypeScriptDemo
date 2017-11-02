/**
 * Created by jiangyu3 on 2017/7/18.
 */
const path = require('path');
const webpack = require('webpack');
const outputPath = path.resolve(__dirname, 'dist');
const { CheckerPlugin } = require('awesome-typescript-loader');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    resolve: {
        alias: {
        },
        // extensions: [".js", ".json", '.css', 'jsx'],
        modules: [
            __dirname,
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',//use .babelrc settings
                // query: {
                //     presets: [['env', {
                //         debug: true //http://babeljs.io/docs/plugins/preset-env/#optionsdebug
                //     }]]
                // }
            },
            //.ts .tsx
            {test: /\.tsx?$/, loader: "babel-loader!awesome-typescript-loader"},
            {
                // test: /imgMatch(\/|\\)css\1.+\.css$/,
                test: /\.css$/,
                loader: 'style-loader!css-loader?sourceMap!postcss-loader',
                // use: [
                //     {
                //         loader: "style-loader/useable",
                //         options: {
                //             // attrs: {id: '__css' + Math.round(Math.random() * 100000 + 1)},
                //             sourceMap: true
                //         }
                //     },
                //     {
                //         loader: "css-loader",
                //         options: {
                //             sourceMap: true
                //         }
                //     }
                // ],
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader?sourceMap!postcss-loader!sass-loader',
                // loader: 'style-loader/useable!css-loader?sourceMap!postcss-loader!sass-loader',
                // use: [{
                //     loader: "style-loader",//将JS字符串生成为style节点
                //     options: {
                //         sourceMap: true
                //     }
                // }, {
                //     loader: "css-loader", //将CSS转化成CommonJS模块
                //     options: {
                //         sourceMap: true
                //     }
                // }, {
                //     loader: "sass-loader", //将Sass编译成CSS
                //     options: {
                //         sourceMap: true
                //     }
                // }]
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader?sourceMap!postcss-loader!less-loader',
                // use: [
                //     {
                //         loader: "style-loader/useable",
                //         options: {
                //             attrs: {id: '__less' + Math.round(Math.random() * 100000 + 1)},
                //             sourceMap: true
                //         }
                //     }, {
                //         loader: "css-loader",
                //         options: {
                //             sourceMap: true
                //         }
                //     }, {
                //         loader: "less-loader",
                //         options: {
                //             sourceMap: true,
                //             // strictMath: true,
                //             // noIeCompat: true
                //         }
                //     }]
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
        filename: '[name].js',
        chunkFilename: '[name].js',
        // chunkFilename: '[name].[chunkhash].js',
        path: outputPath
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            __Env: {
                DEV: true
            },
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        // new CleanWebpackPlugin([outputPath]),
        new webpack.optimize.ModuleConcatenationPlugin(),
        //https://github.com/danethurber/webpack-manifest-plugin
        // new ManifestPlugin(),
        //https://doc.webpack-china.org/plugins/named-modules-plugin
        // new webpack.NamedModulesPlugin(), 
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new CheckerPlugin()
        //https://doc.webpack-china.org/guides/caching/#-extracting-boilerplate-
        //注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // })
    ]
};