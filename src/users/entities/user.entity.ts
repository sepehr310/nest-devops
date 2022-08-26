import { Cart } from 'src/cart/entities/cart.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
@Unique(['mail', 'username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  username: string;
  @Column()
  mail: string;
  @Column()
  password: string;
  @Column()
  salt: string;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Cart, (cart) => cart.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  cart: Cart[];
}
