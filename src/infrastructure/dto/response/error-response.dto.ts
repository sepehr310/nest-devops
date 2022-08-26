import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class error {
  @ApiProperty()
  readonly statusCode: number;
  @ApiProperty()
  readonly message: [string];
}

const example = {
  statusCode: 200,
  message: ['Error'],
};

export class ErrorResponseDto {
  @ApiProperty({ nullable: true })
  data: object;

  @ApiProperty({ type: error, example })
  @Type(() => error)
  @ValidateNested()
  error: error;
}
