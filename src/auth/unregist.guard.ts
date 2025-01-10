import { Injectable } from '@nestjs/common';
import { ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard'; // Import your existing JwtAuthGuard

@Injectable()
export class OptionalJwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Create an instance of JwtAuthGuard and await the result of its canActivate method
      const jwtGuard = new JwtAuthGuard();
      const canActivate = await jwtGuard.canActivate(context);

      // Return the result from the JwtAuthGuard (true or false)
      return canActivate;
    } catch (e) {
      // If there is no JWT (i.e., unauthenticated), just allow the request
      return true; // Allow the request to pass for unauthenticated users
    }
  }
}
