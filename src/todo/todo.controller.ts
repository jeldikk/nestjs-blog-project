import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto } from './todo.dto';
import { ApiTags } from '@nestjs/swagger';

const TODOS = [
  {
    id: 1,
    title: 'Sample Todo',
    completed: false,
  },
  {
    id: 2,
    title: 'Another Todo',
    completed: true,
  },
  {
    id: 3,
    title: 'Third Todo',
    completed: false,
  },
  {
    id: 4,
    title: 'Fourth Todo',
    completed: true,
  },
  {
    id: 5,
    title: 'Fifth Todo',
    completed: false,
  },
  {
    id: 6,
    title: 'Sixth Todo',
    completed: true,
  },
  {
    id: 7,
    title: 'Seventh Todo',
    completed: false,
  },
  {
    id: 8,
    title: 'Eighth Todo',
    completed: true,
  },
  {
    id: 9,
    title: 'Ninth Todo',
    completed: false,
  },
  {
    id: 10,
    title: 'Tenth Todo',
    completed: true,
  },
  {
    id: 11,
    title: 'Eleventh Todo',
    completed: false,
  },
  {
    id: 12,
    title: 'Twelfth Todo',
    completed: true,
  },
  {
    id: 13,
    title: 'Thirteenth Todo',
    completed: false,
  },
  {
    id: 14,
    title: 'Fourteenth Todo',
    completed: true,
  },
];

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  @Get('/:todoId?')
  getTodos(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Param('todoId', new ParseIntPipe({ optional: true })) todoId?: number,
  ) {
    console.log({ todoId, limit, page });
    console.log(typeof todoId);
    console.log(typeof limit);
    console.log(typeof page);
    if (todoId) {
      return TODOS.find((todo) => todo.id === todoId);
    }
    return { message: 'Todos retrieved successfully' };
  }

  @Post()
  createTodo(@Body(new ValidationPipe()) body: CreateTodoDto) {
    console.log(body);

    return {
      message: 'created todo successfully',
    };
  }
}
