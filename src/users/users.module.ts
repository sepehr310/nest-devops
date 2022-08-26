import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashPassword } from './hash/hash';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserJwtSevice } from './jwt/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.jwtSecret,
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    HashPassword,
    JwtService,
    UserJwtSevice,
    JwtStrategy,
  ],
})
export class UsersModule {}
