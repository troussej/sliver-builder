import winston from "winston";

export class LogProvider {

    logger: any;

    public static getLogger(): winston.Logger {
        const options: winston.LoggerOptions = {
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            transports: [
                new winston.transports.Console({
                    level: process.env.NODE_ENV === "production" ? "error" : "debug"
                })
                // new winston.transports.File({ filename: "debug.log", level: "debug" })
            ]
        };

        const logger: winston.Logger = winston.createLogger(options);

        if (process.env.NODE_ENV !== "production") {
            logger.debug("Logging initialized at debug level");
        }

        return logger;
    }


}
const logger: winston.Logger = LogProvider.getLogger();
export { logger };


