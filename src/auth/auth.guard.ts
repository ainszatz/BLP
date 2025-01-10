import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs'; // Import helper to convert Observable to Promise

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = super.canActivate(context);

    // Handle both Observable and Promise cases
    const result: boolean = canActivate instanceof Observable
      ? await firstValueFrom(canActivate)
      : await canActivate;

    // Attach user to the request if allowed
    if (result) {
      const request = context.switchToHttp().getRequest();
      request.user = request.user || null; // Attach user
    }

    return result;
  }
}
