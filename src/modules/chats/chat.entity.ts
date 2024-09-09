import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';  // Ensure correct path
import { User } from '../users/users.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;
  
  @Column({
    type: 'enum',
    enum: ['IN_PERSON', 'REMOTE'],
    default: 'REMOTE',
  })
  deliveryType: 'IN_PERSON' | 'REMOTE';

  @ManyToOne(() => User, user => user.sentChats)
  sender: User;

  @ManyToOne(() => User, user => user.receivedChats)
  receiver: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
