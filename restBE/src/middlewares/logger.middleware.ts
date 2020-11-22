import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const { ip, method, originalUrl: url  } = req;
    const hostname = require('os').hostname();

    Logger.debug(`Request: Params: ${JSON.stringify(req.params)}`);
    res.on('close', () => {
      const { statusCode, statusMessage } = res;
      const contentLength = res.get('content-length');
      Logger.debug(`[${hostname}] "${method} ${url}" ${statusCode} ${statusMessage} ${contentLength} "${ip}"`);
    });

    next();
  }
}
