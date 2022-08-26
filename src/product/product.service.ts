import { Injectable } from '@nestjs/common';
import { ResponseFilterDto } from 'src/infrastructure/dto/response.filter.dto';
import { ResponseFilter } from 'src/infrastructure/filters/reponse.filter';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends ResponseFilter {
  async create(
    createProductDto: CreateProductDto,
  ): Promise<ResponseFilterDto<any>> {
    return this.result(
      await Product.getRepository().create(createProductDto).save(),
    );
  }

  async findAll(): Promise<ResponseFilterDto<any>> {
    return this.result(
      await Product.getRepository().find({
        where: {
          isdelete: false,
        },
      }),
    );
  }

  async findOne(id: number): Promise<ResponseFilterDto<Product>> {
    const product = await Product.getRepository().findOne({
      where: {
        id: id,
      },
    });
    return this.result(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseFilterDto<Product>> {
    const product = await Product.getRepository().findOne({
      where: {
        id: id,
      },
    });
    product.image = updateProductDto.image;
    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    product.description = updateProductDto.description;

    return this.result(await product.save());
  }

  async remove(id: number): Promise<ResponseFilterDto<Product>> {
    const product = await Product.getRepository().findOne({
      where: {
        id: id,
      },
    });
    product.isdelete = true;

    return this.result(await product.save());
  }
}
