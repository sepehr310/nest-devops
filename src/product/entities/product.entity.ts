import { Cart } from 'src/cart/entities/cart.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column({ default: '' })
  description: string;
  @Column({ nullable: true })
  image: string;
  @Column()
  price: number;
  @Column({ default: false })
  isdelete: boolean;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Cart, (cart) => cart.product, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  cart: Cart[];
}
