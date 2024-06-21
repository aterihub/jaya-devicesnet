import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MqttAclService {
  private logger = new Logger(MqttAclService.name);

  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.mqttAcl.findMany();
  }

  findOne(where: Prisma.MqttAclWhereUniqueInput) {
    return this.prisma.mqttAcl.findFirstOrThrow({ where });
  }

  async create(data: Prisma.MqttAclCreateInput) {
    const mqttAcl = this.prisma.mqttAcl.create({
      data: data,
    });

    return mqttAcl;
  }

  update(params: {
    where: Prisma.MqttAclWhereUniqueInput;
    data: Prisma.MqttAclUpdateInput;
  }) {
    return this.prisma.mqttAcl.update(params);
  }

  delete(where: Prisma.MqttAclWhereUniqueInput) {
    return this.prisma.mqttAcl.delete({ where });
  }
}
