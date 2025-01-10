import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // Ensure this import is correct
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, // Ensure UserModule is imported here
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Replace with your own secret
      signOptions: { expiresIn: '60s' }, // Token expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
