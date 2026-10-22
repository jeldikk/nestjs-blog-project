import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateMetaOptionsDto } from 'src/meta-options/meta-options.dto';

export enum PostType {
  POST = 'post',
  PAGE = 'page',
  STORY = 'story',
  SERIES = 'series',
}

export enum PostStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  REVIEW = 'review',
  PUBLISHED = 'published',
}

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of the blog post',
    example: 'This is a title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'title should have a minimum length of 3 characters',
  })
  @MaxLength(512)
  title: string;

  @ApiProperty({
    enum: PostType,
    description: 'Possible values are post, page, story, series',
  })
  @IsEnum(PostType, {
    message: 'postType should be of type PostType',
  })
  postType: PostType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      "A slug should be all small letters and uses only '-' without spaces, example: 'my-url'",
  })
  slug: string;

  @IsEnum(PostStatus, {
    message: 'status should be of type PostStatus',
  })
  status: PostStatus;

  @IsString()
  @IsOptional()
  content?: string;

  @IsJSON()
  @IsOptional()
  schema?: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  tags?: number[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionsDto)
  metaOptions?: CreateMetaOptionsDto | null;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  authorId: number;
}

export class PatchPostDto extends PartialType(CreatePostDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
