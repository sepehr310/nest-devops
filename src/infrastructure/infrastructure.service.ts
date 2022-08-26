import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
@Injectable()
export class InfrastructureService {
  constructor(readonly i18n: I18nService) {}
}
