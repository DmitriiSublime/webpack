import webpack, {Configuration, DefinePlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration["plugins"] {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration["plugins"] = [
        //Собирает html файл в папку build
        new HtmlWebpackPlugin({template: paths.html, favicon: path.resolve(paths.public, 'favicon.ico')}),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode),
        }),
    ];

    if (isDev) {
        //Показывает проценты в процессе сборки, уменьшает скорость
        plugins.push(new webpack.ProgressPlugin());
        //Проверяет typescript в отдельном процессе (уменьшает нагрузку)
        plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    if (isProd) {
        //Создаёт отдельный css файл
        plugins.push(new MiniCssExtractPlugin({
            //Это необязательно, просто для удобства пишем свои имена файлов
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css"
        }))
        plugins.push(new CopyPlugin({
                patterns: [
                    {from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales')},
                    // {from: "other", to: "public"},
                ],
            }),
        )
    }

    if (analyzer) {
        //Анализирует размер собранных файлов
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins;
}