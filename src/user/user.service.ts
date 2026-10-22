import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}

  async findAll() {
    // const NODE_ENV = this.configService.get<string>('NODE_ENV');
    // console.dir({ NODE_ENV });
    // return USERS_DATA;
    const users = await this.userRespository.find();
    return users;
  }

  async findById(id: number) {
    const user = await this.userRespository.findOneBy({
      id,
    });

    return user;
  }

  public async createUser(user: CreateUserDto) {
    // const newUser = {
    //   id: USERS_DATA.length + 1,
    //   ...user,
    // };
    // USERS_DATA.push(newUser);
    const emailExists = await this.userRespository.findOne({
      where: {
        email: user.email,
      },
    });
    if (emailExists) {
      throw new Error('User exists with given email id');
    }
    const newUserInstance = this.userRespository.create(user);
    const newUser = await this.userRespository.save(newUserInstance);
    console.dir({ newUser });
    return newUser;
  }
}
