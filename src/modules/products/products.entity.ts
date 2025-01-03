import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
  // Ensure correct path
import { Comment } from '../comments/comment.entity';  // Ensure correct path
import { Offer } from '../offers/offer.entity';  // Ensure correct path
import { User } from '../users/users.entity';
import { ProductCategory } from '../product-categories/product-categories.entity';
import { Review } from '../reviews/review.entity';
import { Chat } from '../chats/chat.entity';
import { PRODUCT_STATUS_ENUM } from 'src/enums/product_status.enum';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  price: number;


  @Column({
    type: 'enum',
    enum: PRODUCT_STATUS_ENUM,
    default: PRODUCT_STATUS_ENUM.AVAILABLE, 
  })
  status: PRODUCT_STATUS_ENUM;  

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, user => user.products)
  user: User;

  @OneToMany(() => Comment, comment => comment.product)
  comments: Comment[];

  @OneToMany(() => Offer, offer => offer.product)
  offers: Offer[];

  @OneToMany(() => Chat, chats => chats.product)
  chats: Chat[];

  @ManyToOne(() => ProductCategory, category => category.products)
  category: ProductCategory;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
