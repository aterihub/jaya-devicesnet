import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RequestLogs } from 'src/request-logs/request-logs.decorator';
import { MqttAccountService } from './mqtt-account.service';
import { MqttAccountEntity } from './entity/mqttAccount.entity';
import { CreateMqttAccount } from './dto/create-mqttAccount.dto';
import { UpdateMqttAccount } from './dto/update-mqttAccount.dto';

@Controller('mqtt-account')
@UsePipes(ZodValidationPipe)
@UseInterceptors(ClassSerializerInterceptor)
export class MqttAccountController {
  constructor(private mqttAccountService: MqttAccountService) {}

  @Get('/')
  @RequestLogs('getAllMqttAccount')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async findAll() {
    const mqttAccount = await this.mqttAccountService.findAll();
    const mqttAccountEntity = mqttAccount.map(
      (mqttAccount) => new MqttAccountEntity(mqttAccount),
    );

    return {
      status: 'success',
      data: { mqttAccounts: mqttAccountEntity },
    };
  }

  @Get('/:id')
  @RequestLogs('getMqttAccount')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async findOne(@Param('id') id: number) {
    const mqttAccount = await this.mqttAccountService.findOne({ id });
    const mqttAccountEntity = new MqttAccountEntity(mqttAccount);
    return {
      status: 'success',
      data: { mqttAccount: mqttAccountEntity },
    };
  }

  @Post('/')
  @RequestLogs('postMqttAccount')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async create(@Body() data: CreateMqttAccount) {
    const mqttAccount = await this.mqttAccountService.create(data);
    const mqttAccountEntity = new MqttAccountEntity(mqttAccount);
    return {
      status: 'success',
      data: { mqttAccount: mqttAccountEntity },
    };
  }

  @Patch('/:id')
  @RequestLogs('patchMqttAccount')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async update(@Param('id') id: number, @Body() data: UpdateMqttAccount) {
    const mqttAccount = await this.mqttAccountService.update({
      where: { id },
      data,
    });
    const mqttAccountEntity = new MqttAccountEntity(mqttAccount);
    return {
      status: 'success',
      data: { mqttAccount: mqttAccountEntity },
    };
  }

  @Delete('/:id')
  @RequestLogs('deleteMqttAccount')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async delete(@Param('id') id: number) {
    await this.mqttAccountService.delete({ id });
    return {
      status: 'success',
      data: null,
    };
  }
}
