import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    { id: 1, username: 'user', password: 'password' },
    // Add more users as needed
  ];
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async createToken(userId: number) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      console.log('error', error);
    }
  }
}
