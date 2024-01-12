import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";

export function buildResolvers(options: BuildOptions):Configuration["resolve"] {
    //Теперь нет необходимости задавать расширения в импортах типа .js .ts
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}