import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MqttAccountService } from './mqtt-account.service';
import { MqttAccountController } from './mqtt-account.controller';

@Module({
  imports: [AuthModule],
  controllers: [MqttAccountController],
  providers: [MqttAccountService],
})
export class MqttAccountModule {}
