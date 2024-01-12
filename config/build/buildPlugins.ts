import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export function buildPlugins({mode, paths}: BuildOptions): Configuration["plugins"] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration["plugins"] = [
        //Собирает html файл в папку build
        new HtmlWebpackPlugin({template: paths.html}),
    ];

    if (isDev) {
        //Показывает проценты в процессе сборки, уменьшает скорость
        plugins.push(new webpack.ProgressPlugin());
    }

    if (isProd) {
        //Создаёт отдельный css файл
        plugins.push(new MiniCssExtractPlugin({
            //Это необязательно, просто для удобства пишем свои имена файлов
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        }))
    }

    return plugins;
}