import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Post } from '../post/post.entity'; // Post entity for relation

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post])],  // Import Post entity for relation
  providers: [CommentService],  // Add CommentService as a provider
  controllers: [CommentController],  // If you have a controller for Comment
  exports: [CommentService],  // Make CommentService available to other modules
})
export class CommentModule {}
