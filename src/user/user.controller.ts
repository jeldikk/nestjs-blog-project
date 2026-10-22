import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateUserDto,
  DeleteUserParamDto,
  GetUserParamsDto,
  GetUserQueryDto,
  PutUserDto,
  PutUserParamDto,
} from './user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id?')
  @ApiOperation({
    summary: 'Get user details',
    description: 'Endpoint used for getting user details for a given ID',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The position of the page number that you want API to return',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on query',
  })
  getUserDetails(
    @Param() params: GetUserParamsDto,
    @Query() query: GetUserQueryDto,
  ) {
    console.log({ params, query });
    const { id } = params;
    if (id) {
      return this.userService.findById(id);
    }
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async postUser(
    @Body()
    body: CreateUserDto,
  ) {
    console.log({ body });
    console.log(body instanceof CreateUserDto);
    const newUser = await this.userService.createUser(body);
    return { message: 'User created successfully', createdUser: newUser };
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing user' })
  putUser(@Param() params: PutUserParamDto, @Body() body: PutUserDto) {
    // Req decorators directly hijacks the express req object which is similar to express
    console.log({ body });
    console.log(body instanceof PutUserDto);
    const { id } = params;
    return {
      message: 'User Updated successfully',
      updatedUserId: id,
      data: body,
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an existing user' })
  deleteUser(@Param() params: DeleteUserParamDto) {
    const { id } = params;
    return { message: 'User delete successfully', deletedUserId: id };
  }
}
