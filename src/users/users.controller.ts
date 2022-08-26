import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/user-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiTags('User')
  @ApiOperation({ description: 'signup user' })
  @ApiOkResponse({ type: User, status: 200 })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags('User')
  @ApiOperation({ description: 'login user' })
  @Post('login')
  login(@Body() loginUserDto: LoginDto) {
    return this.usersService.loginUser(loginUserDto);
  }
  @ApiOperation({ description: 'get user' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: User, status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
