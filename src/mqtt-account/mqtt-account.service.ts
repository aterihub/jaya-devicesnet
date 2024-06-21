import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MqttAccountService {
  private logger = new Logger(MqttAccountService.name);

  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.mqttAccount.findMany();
  }

  findOne(where: Prisma.MqttAccountWhereUniqueInput) {
    return this.prisma.mqttAccount.findFirstOrThrow({ where });
  }

  async create(data: Prisma.MqttAccountCreateInput) {
    const mqttAccount = this.prisma.mqttAccount.create({
      data: data,
    });

    return mqttAccount;
  }

  update(params: {
    where: Prisma.MqttAccountWhereUniqueInput;
    data: Prisma.MqttAccountUpdateInput;
  }) {
    return this.prisma.mqttAccount.update(params);
  }

  delete(where: Prisma.MqttAccountWhereUniqueInput) {
    return this.prisma.mqttAccount.delete({ where });
  }
}
