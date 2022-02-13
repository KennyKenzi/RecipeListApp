const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {


    resolve: {
        fallback: { 
            "path": require.resolve("path-browserify") 
        }
    },

    

    entry: ['@babel/polyfill','./src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    // devServer:{
    //     contentBase: './dist'
    // },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),

    ],
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
                
            },
            {
                test: /\.css$/i,
                use: [
                  'style-loader',
                  'css-loader',
                ],
              },
              
            ]
    }
};