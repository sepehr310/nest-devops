import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
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
}
