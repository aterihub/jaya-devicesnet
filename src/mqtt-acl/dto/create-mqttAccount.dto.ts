import { ACTION, PERMISSION } from '@prisma/client';
import { z } from 'zod';
import { Qos, Retain } from './typeEnum';

export const createMqttAclSchema = z.object({
  ipaddress: z.string(),
  username: z.string(),
  clientid: z.string(),
  action: z.nativeEnum(ACTION),
  permission: z.nativeEnum(PERMISSION),
  topic: z.string(),
  qos: z.nativeEnum(Qos),
  retain: z.nativeEnum(Retain),
});

export type CreateMqttAcl = z.infer<typeof createMqttAclSchema>;
