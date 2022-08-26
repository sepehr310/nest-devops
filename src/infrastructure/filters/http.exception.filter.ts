import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { IError } from '../interface/error.interface';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService) {}

  logger = new Logger('HttpExceptionFilter');

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse<Response>(),
      status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(exception.message);

    const lang = ctx.getRequest().headers.lang;

    let message: [string];

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      message = ['application.SOMETHING_WENT_WRONG'];
    } else {
      message =
        exception.getResponse() instanceof Object
          ? //@ts-ignore
            exception.getResponse().message
          : exception.getResponse() || [exception.message];
    }

    const translatedMessage = await this.translateError(message, lang),
      error: IError = {
        message: translatedMessage,
        statusCode: status,
        error: exception.message,
      };

    response.status(status).json({
      data: {},
      error,
    });
  }

  async translateError(message: string | Array<string>, lang: string) {
    if (typeof message == 'string') {
      return [
        await this.i18nService.translate(message, {
          lang,
        }),
      ];
    }

    for (let i = 0; i < message.length; i++) {
      message[i] = await this.i18nService.translate(message[i], {
        lang,
      });
    }

    return message;
  }
}
