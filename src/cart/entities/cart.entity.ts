import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartStatus } from '../enum/cartstatus.enum';
@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Product, (product) => product.cart, {
    nullable: true,
  })
  product: Product;
  @ManyToOne(() => User, (user) => user.cart, {
    nullable: true,
  })
  user: Product;

  @Column({ default: 'open', enum: CartStatus })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
