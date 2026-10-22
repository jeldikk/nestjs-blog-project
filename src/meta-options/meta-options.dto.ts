import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateMetaOptionsDto {
  @IsJSON()
  @IsNotEmpty()
  metaValue: string;
}
