import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUserByUsername = await this.userService.findByUsername(createUserDto.username);
    const existingUserByEmail = await this.userService.findByEmail(createUserDto.email);
  
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }
  
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }
  
    const user = await this.userService.register(createUserDto);
    const token = this.generateToken(user);
    return {
      statusCode: 201,
      message: `User ${user.username} registered successfully`,
      access_token: token.access_token,
    };
  }
  async login(username: string, password: string, session: any) {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Create a session
    session.userId = user.id; // Store user ID in session
    session.username = user.username; // Store username in session
  
    const token = this.generateToken(user);
    return {
      statusCode: 200,
      message: `Welcome ${user.username}`,
      access_token: token.access_token,
    };
  }

  async logout(session: any) {
    // Clear session data
    session.userId = null;
    session.username = null;
  
    return {
      statusCode: 200,
      message: 'User logged out successfully',
    };
  }

  private generateToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

