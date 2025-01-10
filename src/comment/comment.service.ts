import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { Comment } from './comment.entity';
import { Post } from '../post/post.entity'; // Import the Post entity for association
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>, // Inject the Post repository for validation
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { postId, content } = createCommentDto;

    // Validate if the associated post exists
    const post = await this.postRepository.findOne({ where: { id: Number(postId) } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Create and save the comment
    const comment = this.commentRepository.create({
      content,
      post, // Associate the comment with the post
    });
    return this.commentRepository.save(comment);
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['post'], // Include the related post if necessary
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id); // Reuse findOne to validate existence

    // Update fields and set the updatedAt timestamp automatically
    Object.assign(comment, updateCommentDto);
    comment.updatedAt = new Date(); // Update updatedAt field

    return this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id); // Reuse findOne to validate existence
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    await this.commentRepository.remove(comment); // Remove the comment
  }

  async removeCommentsByPostId(postId: number): Promise<void> {
    const comments = await this.commentRepository.find({ where: { post: { id: postId } } });
    if (comments.length > 0) {
      await this.commentRepository.remove(comments); // Delete the found comments
    }
  }
}
