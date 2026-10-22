import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, description: 'First Name of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @ApiProperty({ required: true, description: 'Last Name of the user' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @ApiProperty({ required: true, description: 'Email address of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least one letter, one number, and be at least 8 characters long',
  })
  password: string;
}

export class GetUserParamsDto {
  @ApiPropertyOptional({
    description: 'Get User with specific ID',
    example: 1234,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}

export class GetUserQueryDto {
  @ApiProperty({
    required: true,
    description: 'Number of items in response',
  })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ required: true, description: 'Page number of the response' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;
}

export class PutUserDto extends PartialType(CreateUserDto) {}

export class PutUserParamDto {
  @ApiProperty({ required: true, description: 'ID of the user' })
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class DeleteUserParamDto extends PutUserParamDto {}
