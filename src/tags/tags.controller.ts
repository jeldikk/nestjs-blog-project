import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';
import {
  CreateTagDto,
  DeleteTagParamsDto,
  UpdateTagDto,
  UpdateTagParamsDto,
} from './tags.dto';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAllTags() {
    return this.tagsService.findAll();
  }

  @Post()
  createTag(@Body() body: CreateTagDto) {
    return this.tagsService.createTag(body);
  }

  @Put('/:id')
  updateTag(@Param() params: UpdateTagParamsDto, @Body() body: UpdateTagDto) {
    console.log({ params, body });
    return {
      message: 'updated tag',
    };
  }

  @Delete('/:id')
  async deleteTag(@Param() params: DeleteTagParamsDto) {
    console.log({ params });
    await this.tagsService.deleteTag(params.id);
    return {
      deleteTagId: params.id,
    };
  }
}
