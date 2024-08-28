import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
  // Ensure correct path

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column()
  status: string;  // Status can be an ENUM or a string

  @ManyToOne(() => User, user => user.offers)
  user: User;

  @ManyToOne(() => Product, product => product.offers)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
