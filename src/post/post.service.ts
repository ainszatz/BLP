import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { UserService } from '../user/user.service';  // Import the UserService
import { plainToClass } from 'class-transformer';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,  // Inject UserService
  ) {}

  async create(createPostDto: CreatePostDto, userId: number | null): Promise<Post> {
    if (!userId) {
      throw new UnauthorizedException('You must be logged in to create a post');
    }

    // Fetch the user using the UserService
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Create the post with authorId (userId) and the full user object for the relation
    const post = this.postRepository.create({
      ...createPostDto,
      authorId: user.id,  // Store the authorId (number)
      author: user,       // Store the full user object for the relation
    });

    return this.postRepository.save(post);
  }


  async findAll(): Promise<Post[]> {
    const posts = await this.postRepository.find({ relations: ['comments', 'author'] });

    // Transform the posts to include only the author username
    return plainToClass(Post, posts);
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['comments', 'author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Transform the post to include only the author username
    return plainToClass(Post, post);
  }
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    Object.assign(post, updatePostDto); // Merge updated fields
    post.updatedAt = new Date(); // Update the updatedAt field
    return this.postRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    await this.postRepository.remove(post);
  }
}
