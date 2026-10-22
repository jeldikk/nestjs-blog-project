import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Tag } from './tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from './tags.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    const tags = await this.tagRepository.find();
    return tags;
  }

  async findMultipleTagsByIds(tagIds: number[]) {
    const tags = await this.tagRepository.find({
      where: {
        id: In(tagIds),
      },
    });
    return tags;
  }

  async createTag(tagData: CreateTagDto) {
    let tag = this.tagRepository.create(tagData);
    tag = await this.tagRepository.save(tag);
    return tag;
  }

  async deleteTag(tagId: number) {
    await this.tagRepository.delete(tagId);
  }
}
