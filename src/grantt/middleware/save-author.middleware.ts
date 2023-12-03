import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SaveAuthorMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: any, res: any, next: NextFunction) {
    try {
      const token = req.headers.authorization.replace('Bearer ', '');

      const decodedToken = await this.authService.validateToken(token);
      const userId = decodedToken.sub;

      req['userId'] = userId;

      next();
    } catch (error) {
      console.log('Error extracting user ID from token:', error);
      next();
    }
  }
}
