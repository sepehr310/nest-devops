import { ResponseFilterDto } from '../dto/response.filter.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseFilter {
  result<T>(data: T): ResponseFilterDto<T> {
    return {
      data,
      error: null,
    };
  }
}
