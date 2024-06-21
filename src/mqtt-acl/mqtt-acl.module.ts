import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MqttAclService } from './mqtt-acl.service';
import { MqttAclController } from './mqtt-acl.controller';

@Module({
  imports: [AuthModule],
  controllers: [MqttAclController],
  providers: [MqttAclService],
})
export class MqttAclModule {}
