import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { CommentModule } from '../comment/comment.module';  // Import the CommentModule
import { UserModule } from '../user/user.module';  // Import the UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]), 
    CommentModule, 
    UserModule,  // Add UserModule to imports
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
