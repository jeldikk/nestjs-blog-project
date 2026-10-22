import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMetaOptionsDto } from './meta-options.dto';
import { MetaOptionsService } from './meta-options.service';

@ApiTags('Meta Options')
@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Get()
  findAll() {
    return [];
  }

  @Post()
  create(@Body() body: CreateMetaOptionsDto) {
    console.log({ body });
    return this.metaOptionsService.createMetaOptions(body);
  }
}
