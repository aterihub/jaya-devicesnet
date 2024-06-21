import { z } from 'zod';
import { createMqttAccountSchema } from './create-mqttAccount.dto';

export const updateMqttAccountSchema = createMqttAccountSchema.partial();
export type UpdateMqttAccount = z.infer<typeof updateMqttAccountSchema>;
