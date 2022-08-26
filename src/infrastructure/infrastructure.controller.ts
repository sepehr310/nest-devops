import { Controller, Get, Query } from '@nestjs/common';
import { I18nLang } from 'nestjs-i18n';
import { InfrastructureService } from './infrastructure.service';

@Controller('api/infrastructure')
export class InfrastructureController {
  constructor(private readonly infrastructureService: InfrastructureService) {}
}
