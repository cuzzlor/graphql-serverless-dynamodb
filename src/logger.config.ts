import { format, Format, TransformableInfo } from 'logform';
import { createLogger, transports } from 'winston';
import * as Transport from 'winston-transport';
import config from './config.config';

export const defaultTransports: Transport[] = [];

if (config.get<boolean>('logging.transports.console.enabled')) {
    let consoleFormat: Format;

    if (config.get<boolean>('logging.transports.console.pretty')) {
        // tslint:disable: no-var-requires
        const yamlifyObject = require('yamlify-object');
        const yamlifyColors = require('yamlify-object-colors');

        consoleFormat = format.combine(
            format.colorize(),
            format.printf((info: TransformableInfo) => {
                const { level, message, ...meta } = info;
                const yaml = yamlifyObject(meta, {
                    colors: yamlifyColors,
                });
                return `[${level}] ${message}${yaml}`;
            }),
        );
    } else {
        consoleFormat = format.printf((info: TransformableInfo) => JSON.stringify(info));
    }

    defaultTransports.push(
        new transports.Console({
            format: consoleFormat,
        }),
    );
}

export const logger = createLogger({
    level: 'info',
    transports: defaultTransports,
});
