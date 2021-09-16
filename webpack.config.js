const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const MiniCssExtractPlugins = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const config = {
    entry : {
        bundle: './src/index.js',
    },
    output : {
        path: path.resolve(__dirname, 'build'),
    },
    optimization : {
        splitChunks : {
            chunks : 'all'
        }
    },
    module : {
        rules: [
            {
                test : /\.(png|jpe?g|gif)$/i,
                use : [
                    {
                        loader : "file-loader",
                        options :  {
                            publicPath: "images",
                            outputPath : "images",
                            name : '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test : /\.(woff|woff2|eot|ttf)$/i,
                use : [
                    {
                        loader : "file-loader",
                        options: {
                            publicPath : "fonts",
                            outputPath : "fonts",
                            name : '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    plugins : [
        new HtmlWebpackPlugins({
            title : "HoseinDoran Index App",
            template : './src/index.html',
            filename : "index.html",
            chunks : ["bundle"]
        }),
        new CleanWebpackPlugin({
            dry: true
        })
    ]
}

module.exports = (env , {mode}) => {

    let  IsDevelopment = mode === 'development';

    if(IsDevelopment) { 
        config.devServer = {
            static: path.resolve(__dirname, 'build'),
            port : 8000
        }
    }

    config.module.rules.push(... [
        {
            test : /\.css$/i,
            use : [IsDevelopment ? 'style-loader' : MiniCssExtractPlugins.loader,"css-loader"]
        },
        {
            test : /\.s[ac]ss$/i,
            use : [IsDevelopment ? 'style-loader' : MiniCssExtractPlugins.loader,"css-loader", "sass-loader"]
        },
    ])

    if(!IsDevelopment) {
        config.output.filename = 'js/[name][contenthash].js',
        config.plugins.push(
            new MiniCssExtractPlugins({
                filename: '[name][contenthash].css'
            }),
        )
    }
    return config;
}