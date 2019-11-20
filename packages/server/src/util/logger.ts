import winston from "winston";
import _ from 'lodash';
export class LogProvider {

  logger: any;

  public static getLogger(): winston.Logger {
    let level = process.env["LOG_LEVEL"]

    if (_.isNil(level)) {
      level = process.env.NODE_ENV === "production" ? "error" : "debug";
    }

    const options: winston.LoggerOptions = {
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.simple()
      ),
      transports: [
        new winston.transports.Console({
          level
        })
        // new winston.transports.File({ filename: "debug.log", level: "debug" })
      ]
    };

    const logger: winston.Logger = winston.createLogger(options);

    if (process.env.NODE_ENV !== "production") {
      logger.debug("Logging initialized at %s level", level);
    }

    return logger;
  }


}
const logger: winston.Logger = LogProvider.getLogger();
export { logger };


