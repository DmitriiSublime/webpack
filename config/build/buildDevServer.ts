//Взяли с npm сайта иначе выдаёт ошибку
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions} from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    //Для запуска сервера, чтобы видеть сборку в режиме online + port свой или рандомный
    return {
        port: options.port ?? 5000,
        open: true
    }
}