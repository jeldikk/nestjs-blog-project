import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Should have 5 characters minimum' })
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: false;
}
