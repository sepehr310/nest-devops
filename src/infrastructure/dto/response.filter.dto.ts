import { ApiProperty } from '@nestjs/swagger';

export class ResponseFilterDto<T> {
  @ApiProperty()
  data: T;
  @ApiProperty()
  error: object;
}
