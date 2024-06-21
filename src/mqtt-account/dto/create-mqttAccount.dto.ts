import { z } from 'zod';

export const createMqttAccountSchema = z.object({
  gatewaySerialNumber: z.string(),
  username: z.string(),
  password: z.string(),
  isSuperUser: z.boolean(),
});

export type CreateMqttAccount = z.infer<typeof createMqttAccountSchema>;
