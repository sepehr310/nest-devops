import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/users/jwt/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @ApiOperation({ description: 'get user' })
  @ApiBearerAuth()
  @ApiOkResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post()
  async addToCart(@Body() createCartDto: CreateCartDto, @Req() req) {
    createCartDto.user = await User.getRepository().findOne({
      where: {
        id: createCartDto.userid,
      },
    });
    return this.cartService.create(createCartDto);
  }

  // @Get()
  // findAll() {
  //   return this.cartService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
