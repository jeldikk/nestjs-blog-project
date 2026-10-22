import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

const USERS_DATA: (CreateUserDto & { id: number })[] = [
  {
    id: 1,
    firstName: 'Kamal',
    lastName: 'Jeldi',
    email: 'kamal@example.com',
    password: 'Password123',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'Password123',
  },
  {
    id: 3,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'Password123',
  },
  {
    id: 4,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    password: 'Password123',
  },
  {
    id: 5,
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob@example.com',
    password: 'Password123',
  },
];

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
