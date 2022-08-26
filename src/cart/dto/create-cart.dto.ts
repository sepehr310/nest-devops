import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  user: User;

  @ApiProperty()
  productid: number;
  @ApiProperty()
  userid: number;
}
