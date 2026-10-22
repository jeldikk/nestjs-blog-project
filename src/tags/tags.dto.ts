import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'name should be atleast 3 chars in length',
  })
  @MaxLength(512)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'slug should be atleast 3 chars in length',
  })
  @MaxLength(512)
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'description should be atleast 3 chars in length',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'schema should be atleast 3 chars in length',
  })
  @MaxLength(512)
  schema: string;

  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto) {}

export class UpdateTagParamsDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}

export class DeleteTagParamsDto extends UpdateTagParamsDto {}
