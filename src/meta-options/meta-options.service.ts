import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOption } from './meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMetaOptionsDto } from './meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  async createMetaOptions(options: CreateMetaOptionsDto) {
    let newOptions = this.metaOptionsRepository.create(options);
    newOptions = await this.metaOptionsRepository.save(newOptions);
    return newOptions;
  }
}
