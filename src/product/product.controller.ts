import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiTags('Product')
  @ApiOperation({ description: 'create product' })
  // @ApiBearerAuth()
  @ApiOkResponse({ type: User, status: 200 })
  // @UseGuards(AzureADGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiTags('Product')
  @ApiOperation({ description: 'get all product' })
  // @ApiBearerAuth()
  @ApiOkResponse({ type: User, status: 200 })
  // @UseGuards(AzureADGuard)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiTags('Product')
  @ApiOperation({ description: 'get product by id' })
  // @ApiBearerAuth()
  @ApiOkResponse({ type: User, status: 200 })
  // @UseGuards(AzureADGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiTags('Product')
  @ApiOperation({ description: 'update product by id' })
  // @ApiBearerAuth()
  @ApiOkResponse({ type: User, status: 200 })
  // @UseGuards(AzureADGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiTags('Product')
  @ApiOperation({ description: 'delete product by id' })
  // @ApiBearerAuth()
  @ApiOkResponse({ type: User, status: 200 })
  // @UseGuards(AzureADGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
