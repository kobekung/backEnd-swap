import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
import { OFFER_STATUS_ENUM } from 'src/enums/offer_status.enum';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image?: string;  // New field for image

  @Column({ type: 'decimal', nullable: true })
  price: number;  // New field for price

  @Column({ type: 'enum', enum: OFFER_STATUS_ENUM, default: OFFER_STATUS_ENUM.PENDING })
  status: OFFER_STATUS_ENUM;

  @ManyToOne(() => User, user => user.sentOffers)  // Relationship for the sender
  fromUser: User;

  @ManyToOne(() => User, user => user.receivedOffers)  // Relationship for the receiver
  toUser: User;

  @ManyToOne(() => Product, product => product.offers)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
