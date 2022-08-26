import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/users/jwt/jwt-auth.guard';
import { Product } from './entities/product.entity';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiTags('Product')
  @ApiOperation({ description: 'create product' })
  @ApiBearerAuth()
  @ApiOkResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req) {
    const id = req.app;
    console.log(id);
    return this.productService.create(createProductDto);
  }

  @ApiTags('Product')
  @ApiOperation({ description: 'get all product' })
  @ApiBearerAuth()
  @ApiOkResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiTags('Product')
  @ApiOperation({ description: 'get product by id' })
  @ApiBearerAuth()
  @ApiOkResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiTags('Product')
  @ApiOperation({ description: 'update product by id' })
  @ApiBearerAuth()
  @ApiOkResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiTags('Product')
  @ApiOperation({ description: 'delete product by id' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: Product, status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
