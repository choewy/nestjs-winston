import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { GetValueQuery } from './queries';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('value/:type')
  async getValue(@Param() param: GetValueQuery) {
    return this.appService.getValue(param.type);
  }

  @Get('error')
  async throwError() {
    return this.appService.throwError();
  }

  @Get('execption')
  async throwException() {
    return this.appService.throwException();
  }
}
