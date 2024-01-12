import webpack from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {mode, paths} = options;
    const isDev = mode === 'development';

    return {
        //Ссылка на script в package.json
        mode: mode ?? 'development',
        entry: paths.entry,

        //Показывает путь к файлу
        output: {
            path: paths.output,
            filename: "[name].[contenthash:8].js",
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        //Теперь нет необходимости задавать расширения в импортах типа .js .ts
        resolve: buildResolvers(options),
        //Для отслеживания ошибок
        devtool: isDev && 'inline-source-map',
        //Для запуска сервера, чтобы видеть сборку в режиме online + port свой или рандомный
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}