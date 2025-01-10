import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ 
    status: 201, 
    description: 'User registered successfully.', 
    type: CreateUserDto,
    examples: {
      'application/json': {
        summary: 'Example of a successful registration',
        value: {
          username: 'john_doe',
          password: 'securePassword123',
          email: 'john@example.com'
        }
      }
    }
  })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ 
    status: 200, 
    description: 'User logged in successfully.', 
    type: Object,
    examples: {
      'application/json': {
        summary: 'Example of a successful login',
        value: {
          username: 'john_doe',
          password: 'securePassword123'
        }
      }
    }
  })
  async login(@Body() loginDto: { username: string; password: string }) {
    return this.userService.login(loginDto.username, loginDto.password);
  }

  @Get('profile/:username')
  @ApiOperation({ summary: 'Get user profile by username' })
  @ApiResponse({ 
    status: 200, 
    description: 'User profile retrieved successfully.', 
    type: Object,
    examples: {
      'application/json': {
        summary: 'Example of a retrieved user profile',
        value: {
          username: 'john_doe',
          email: 'john@example.com',
          posts: [
            {
              title: 'My First Post',
              content: 'This is the content of my first post.'
            }
          ]
        }
      }
    }
  })
  async getUserProfile(@Param('username') username: string) {
    return this.userService.getUserProfile(username);
  }
}

