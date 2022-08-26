import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResponseFilterDto } from 'src/infrastructure/dto/response.filter.dto';
import { ResponseFilter } from 'src/infrastructure/filters/reponse.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import { HashPassword } from './hash/hash';
import { UserJwtSevice } from './jwt/jwt';
@Injectable()
export class UsersService extends ResponseFilter {
  constructor(
    private readonly hash: HashPassword,
    private readonly jwt: UserJwtSevice,
  ) {
    super();
  }
  async create(createUserDto: CreateUserDto): Promise<ResponseFilterDto<any>> {
    try {
      const { mail, password, username } = createUserDto;
      const salt = await this.hash.createSalt();
      const user = await User.getRepository()
        .create({
          salt: salt,
          password: await this.hash.hashPassword(password, salt),
          mail: mail,
          username: username,
        })
        .save();
      return this.result({ username: user.username });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async loginUser(loginDto: LoginDto): Promise<ResponseFilterDto<any>> {
    try {
      const user = await User.getRepository().findOne({
        where: {
          username: loginDto.username,
        },
      });
      const check = await this.hash.validatePassword(
        loginDto.password,
        user.password,
      );
      if (check) {
        return this.result({
          token: await this.jwt.generateAccessToken(
            user.username,
            user.id,
            'user',
          ),
        });
      } else {
        throw new InternalServerErrorException(
          'user.Invalid Username or Password',
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<ResponseFilterDto<User[]>> {
    try {
      return this.result(await User.getRepository().find());
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
