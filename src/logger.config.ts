import config from 'config';
import _ from 'lodash';
import { format, Format, TransformableInfo } from 'logform';
import { createLogger, LoggerOptions, transports } from 'winston';
import * as Transport from 'winston-transport';

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
                const { level, message, environment, ...meta } = info;
                const yaml = yamlifyObject(meta, {
                    colors: yamlifyColors,
                });
                return `[${level}] ${message}${yaml}`; // throw away 'environment' for pretty console output
            }),
        );
    } else {
        consoleFormat = format.combine(format.timestamp(), format.json());
    }

    defaultTransports.push(
        new transports.Console({
            format: consoleFormat,
            handleExceptions: false,
            silent: config.get<boolean>('logging.transports.console.silent'),
        }),
    );
}

export const createDefaultLogger = (options?: Partial<LoggerOptions>) => {
    const mergedOptions = _.merge(
        { ...options },
        { ...config.get<Partial<LoggerOptions>>('logging.loggers.default') },
        { transports: defaultTransports },
    );
    return createLogger(mergedOptions);
};

export const logger = createDefaultLogger();
