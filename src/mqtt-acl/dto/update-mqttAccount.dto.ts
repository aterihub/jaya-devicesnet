import { z } from 'zod';
import { createMqttAclSchema } from './create-mqttAccount.dto';

export const updateMqttAclSchema = createMqttAclSchema.partial();
export type UpdateMqttAcl = z.infer<typeof updateMqttAclSchema>;
