import { NextFunction, Request } from 'express';
import { logger } from '../util/logger';



function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  logger.debug(`${request.method} ${request.path}`);
  next();
}

export default loggerMiddleware;
