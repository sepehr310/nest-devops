import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method } = request;
    const userAgent = request.get('user-agent') || '';
    const Url =
      request.protocol + '://' + request.get('host') + request.originalUrl;
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${Url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });
    next();
  }
}
