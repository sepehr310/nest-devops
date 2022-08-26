import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserJwtSevice {
  constructor(private readonly jwtService: JwtService) {}
  async generateAccessToken(
    username: string,
    id: number,
    role: string,
  ): Promise<Object> {
    const payload = { username: username, id: id, role: role };
    const expiresIn = process.env.jwtexpiresIn;

    const jwtToken = await this.jwtService.sign(payload, {
      expiresIn,
      secret: process.env.jwtSecret,
    });
    return { jwtToken };
  }
}
