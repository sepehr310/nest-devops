import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Product } from 'src/product/entities/product.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { CartStatus } from './enum/cartstatus.enum';

@Injectable()
export class CartService {
  async create(createCartDto: CreateCartDto) {
    try {
      const userCart = await Cart.getRepository()
        .createQueryBuilder('Cart')
        .leftJoinAndSelect('Cart.user', 'user')
        .andWhere(`user.id = ${createCartDto.user.id}`)
        .andWhere(`Cart.status = '${CartStatus.Open}'`)
        .getOne();

      if (userCart) {
        return await this.addProductToCart(userCart, createCartDto.productid);
      } else {
        const cart = await Cart.getRepository()
          .create({
            user: createCartDto.user,
            status: CartStatus.Open,
          })
          .save();
        return await this.addProductToCart(cart, createCartDto.productid);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async addProductToCart(cart: Cart, productid: number) {
    try {
      const product = await Product.getRepository().findOne({
        where: {
          id: productid,
        },
      });

      product.cart.push(cart);
      return await product.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
