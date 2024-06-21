import { $Enums, MqttAcl } from '@prisma/client';

export class MqttAclEntity implements MqttAcl {
  constructor({ ...data }: Partial<MqttAclEntity>) {
    Object.assign(this, data);
  }

  id: number;
  username: string;
  action: $Enums.ACTION;
  clientid: string;
  ipaddress: string;
  permission: $Enums.PERMISSION;
  qos: number | null;
  retain: number | null;
  topic: string;

  createdAt: Date;
  updatedAt: Date;
}
