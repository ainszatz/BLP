import { Controller, Post, Get, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    return this.authService.register(createUserDto);
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
  async login(@Body() loginDto: { username: string; password: string }, @Req() request: any): Promise<{ statusCode: number; message: string; access_token: string }> {
    return this.authService.login(loginDto.username, loginDto.password, request.session);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout a user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully.' })
  async logout(@Req() request: any): Promise<{ statusCode: number; message: string }> {
    return this.authService.logout(request.session);
  }

  @Get('session')
  getSession(@Req() req: Request): any {
      if (req.session?.userId) {
          return { userId: req.session.userId, username: req.session.username };
      } else {
          return { message: 'No session data available' };
      }
  }

}