import { BadRequestException, Injectable } from '@nestjs/common';

import { ValueDto } from './dtos';
import { GetValueType } from './enums';

@Injectable()
export class AppService {
  private async getBoolean() {
    return true;
  }

  private async getString() {
    return 'hello nestjs winston';
  }

  private async getNumber() {
    return 1;
  }

  private async getObject() {
    return {
      context: AppService.name,
      method: this.getObject.name,
    };
  }

  private async getArray() {
    return [this.getBoolean(), this.getString(), this.getNumber(), this.getObject()];
  }

  async getValue(type: GetValueType) {
    let value: string | number | boolean | object | unknown[];

    switch (type) {
      case GetValueType.Boolean:
        value = this.getBoolean();
        break;

      case GetValueType.String:
        value = this.getString();
        break;

      case GetValueType.Number:
        value = this.getNumber();
        break;

      case GetValueType.Object:
        value = this.getObject();
        break;

      case GetValueType.Array:
        value = this.getArray();
        break;
    }

    return new ValueDto(type, value);
  }

  async throwError() {
    throw new Error('error');
  }

  async throwException() {
    throw new BadRequestException('exception');
  }
}
