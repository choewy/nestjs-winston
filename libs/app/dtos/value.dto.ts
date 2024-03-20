import { GetValueType } from '../enums';

export class ValueDto {
  constructor(
    readonly type: GetValueType,
    readonly value: string | boolean | number | object | Array<unknown>,
  ) {}
}
