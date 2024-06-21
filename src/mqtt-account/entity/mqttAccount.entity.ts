import { MqttAccount } from '@prisma/client';

export class MqttAccountEntity implements MqttAccount {
  constructor({ ...data }: Partial<MqttAccountEntity>) {
    Object.assign(this, data);
  }

  id: number;
  username: string;
  isSuperUser: boolean;
  password: string;
  gatewaySerialNumber: string | null;

  createdAt: Date;
  updatedAt: Date;
}
