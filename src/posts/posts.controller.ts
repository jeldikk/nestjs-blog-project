import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto, PatchPostDto } from './posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId?')
  getPosts(@Param('userId') userId: string) {
    return this.postsService.findAllPosts(userId);
  }

  @Post()
  createPost(@Body() body: CreatePostDto) {
    return this.postsService.createPost(body);
  }

  @Patch()
  updatePost(@Body() body: PatchPostDto) {
    return this.postsService.update(body);
  }

  @Delete('/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.postsService.deletePost(id);
    // return deleteRes;
  }
}
