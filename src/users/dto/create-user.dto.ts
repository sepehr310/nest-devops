import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  mail: string;
  @ApiProperty()
  password: string;
}
