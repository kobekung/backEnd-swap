import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Notification } from '../notifications/notification.entity';  // Ensure correct path
import { Comment } from '../comments/comment.entity';
import { Offer } from '../offers/offer.entity';
import { Product } from '../products/products.entity';
import { Report } from '../reports/report.entity';
import { Review } from '../reviews/review.entity';
import { Admin } from '../admins/admin.entity';
import { Chat } from '../chats/chat.entity';
import { Follow } from '../follow/follow.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ length: 50, nullable: true })
  nickname: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role: string;

  @ManyToOne(() => Admin, admin => admin.users)
  admin: Admin;
  
  @OneToMany(() => Product, product => product.user)
  products: Product[];

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @OneToMany(() => Offer, offer => offer.fromUser)
  sentOffers: Offer[];

  @OneToMany(() => Offer, offer => offer.toUser)
  receivedOffers: Offer[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => Chat, chat => chat.sender)
  sentChats: Chat[];

  @OneToMany(() => Chat, chat => chat.receiver)
  receivedChats: Chat[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];
}
