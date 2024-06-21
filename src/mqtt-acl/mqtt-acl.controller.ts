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
import { MqttAclService } from './mqtt-acl.service';
import { MqttAclEntity } from './entity/mqttAccount.entity';
import { CreateMqttAcl } from './dto/create-mqttAccount.dto';
import { UpdateMqttAcl } from './dto/update-mqttAccount.dto';

@Controller('mqtt-acl')
@UsePipes(ZodValidationPipe)
@UseInterceptors(ClassSerializerInterceptor)
export class MqttAclController {
  constructor(private mqttAclService: MqttAclService) {}

  @Get('/')
  @RequestLogs('getAllMqttAcl')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async findAll() {
    const mqttAcl = await this.mqttAclService.findAll();
    const mqttAclEntity = mqttAcl.map((mqttAcl) => new MqttAclEntity(mqttAcl));

    return {
      status: 'success',
      data: { mqttAcls: mqttAclEntity },
    };
  }

  @Get('/:id')
  @RequestLogs('getMqttAcl')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async findOne(@Param('id') id: number) {
    const mqttAcl = await this.mqttAclService.findOne({ id });
    const mqttAclEntity = new MqttAclEntity(mqttAcl);
    return {
      status: 'success',
      data: { mqttAcl: mqttAclEntity },
    };
  }

  @Post('/')
  @RequestLogs('postMqttAcl')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async create(@Body() data: CreateMqttAcl) {
    const mqttAcl = await this.mqttAclService.create(data);
    const mqttAclEntity = new MqttAclEntity(mqttAcl);
    return {
      status: 'success',
      data: { mqttAcl: mqttAclEntity },
    };
  }

  @Patch('/:id')
  @RequestLogs('patchMqttAcl')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async update(@Param('id') id: number, @Body() data: UpdateMqttAcl) {
    const mqttAcl = await this.mqttAclService.update({
      where: { id },
      data,
    });
    const mqttAclEntity = new MqttAclEntity(mqttAcl);
    return {
      status: 'success',
      data: { mqttAcl: mqttAclEntity },
    };
  }

  @Delete('/:id')
  @RequestLogs('deleteMqttAcl')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async delete(@Param('id') id: number) {
    await this.mqttAclService.delete({ id });
    return {
      status: 'success',
      data: null,
    };
  }
}
