import { IsEnum } from 'class-validator';

import { GetValueType } from '../enums';

export class GetValueQuery {
  @IsEnum(GetValueType)
  type: GetValueType;
}
