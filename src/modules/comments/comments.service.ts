import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
import { ICommented } from 'src/interface/Comments.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

    async createComment(createCommentDto: ICommented): Promise<Comment> {
      const { user_id, product_id, content } = createCommentDto;
    
      // แก้การค้นหา user
      const user = await this.userRepository.findOneBy({ id: user_id });
      if (!user) {
        throw new Error('User not found');
      }
    
      // แก้การค้นหา product
      const product = await this.productRepository.findOneBy({ id: product_id });
      if (!product) {
        throw new Error('Product not found');
      }
    
      const comment = this.commentRepository.create({
        user,
        product,
        content,
      });
    
      return this.commentRepository.save(comment);
    }
    

    async getCommentsByProduct(product_id: number): Promise<Comment[]> {
      return this.commentRepository.find({
        where: { product: { id: product_id } },
        relations: ['user', 'product'],
        order: { createdAt: 'DESC' }
      });
    }

    async getCommentsByUser(user_id: number): Promise<Comment[]> {
      return this.commentRepository.find({
        where: { user: { id: user_id } },
        relations: ['user', 'product'],
        order: { createdAt: 'DESC' }
      });
    }
}
