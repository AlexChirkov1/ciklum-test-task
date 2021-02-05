const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const  webpack  = require('webpack')

module.exports = {
    entry: {
        main:path.resolve(__dirname, './src/index.js'),
        creator: path.resolve(__dirname, './src/creation.js')
    },
    output: {
        path:path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: "/ciklum-test-task/"
    },
    mode: 'production',
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname,'./ dist'),
        open:true,
        compress:true,
        hot: true,
        port:8080
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Calendar',
            template:path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            chunks:['main']
        }),
        new HtmlWebpackPlugin({
            title: 'Create new event',
            template:path.resolve(__dirname, './src/create-event.html'),
            filename: 'create-event.html',
            chunks:['creator']
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    }
}