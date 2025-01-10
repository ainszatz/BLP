import { Controller, Post, Body, Get, Param, Delete, Put, ParseIntPipe, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Post as BlogPost } from './post.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { OptionalJwtAuthGuard } from '../auth/unregist.guard';

@ApiTags('posts')
@Controller('posts')
@UseGuards(OptionalJwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully.', type: BlogPost })
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request): Promise<BlogPost> {
    const userId = req.session.userId ? Number(req.session.userId) : null; // Get userId from session
    const post = await this.postService.create(createPostDto, userId); // Pass the userId to service
    return post;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing post' })
  @ApiResponse({ status: 200, description: 'Post updated successfully.', type: BlogPost })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request
  ): Promise<BlogPost> {
    const userId = req.session.userId ? Number(req.session.userId) : null; // Get the userId from session
    const post = await this.postService.findOne(id); // Retrieve the post
    if (post.authorId !== userId) {
      throw new UnauthorizedException('You are not authorized to update this post');
    }

    return this.postService.update(id, updatePostDto); // Call the update method from PostService
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully.' })
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<{ message: string }> {
    const userId = req.session.userId ? Number(req.session.userId) : null; // Get the userId from session
    const post = await this.postService.findOne(id); // Retrieve the post
    if (post.authorId !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this post');
    }

    await this.postService.remove(id); // Call the remove method from PostService
    return { message: `Post ${post.title} deleted successfully.` };
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all posts' })
  @ApiResponse({ status: 200, description: 'List of posts retrieved successfully.', type: [BlogPost] })
  async findAll(): Promise<BlogPost[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a post by ID' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully.', type: BlogPost })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BlogPost> {
    return this.postService.findOne(id);
  }
}
