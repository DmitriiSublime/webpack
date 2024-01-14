import webpack, {Configuration, DefinePlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration["plugins"] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration["plugins"] = [
        //Собирает html файл в папку build
        new HtmlWebpackPlugin({template: paths.html}),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform)
        })
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

    if(analyzer) {
        //Анализирует размер собранных файлов
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins;
}