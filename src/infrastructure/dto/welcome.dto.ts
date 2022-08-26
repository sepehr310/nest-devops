import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class WelcomeDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  time: number;
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  room: number;
}
