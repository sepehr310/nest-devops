import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ default: '' })
  description: string;
  @ApiProperty({ nullable: true })
  image: string;
  @ApiProperty()
  price: number;
}
