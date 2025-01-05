import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // Ensure correct path
import { User } from '../users/users.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  reason: string;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ default: 'pending' })
  status: string; // Status can be 'pending', 'resolved', etc.

  @Column({ type: 'int', default: 0 })
  amount: number; // Number of times the entity has been reported

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
