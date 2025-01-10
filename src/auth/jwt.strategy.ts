import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import * as dotenv from 'dotenv'; // Import dotenv for environment variables

dotenv.config(); // Load environment variables

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your-jwt-secret', // Use environment variable for secret
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub); // Find user by ID (sub)
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    // Optionally log the validation failure for debugging
    console.error('User validation failed for payload:', payload);

    return user; // Return user if found
  }
}
