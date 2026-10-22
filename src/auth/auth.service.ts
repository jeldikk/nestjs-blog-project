import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const allUsers = await this.userService.findAll();
    const user = allUsers.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user };
  }

  register(registerDto: RegisterDto) {
    console.log(registerDto instanceof RegisterDto);
    console.log(registerDto);
    return {
      message: 'registered',
    };
  }
}
