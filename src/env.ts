import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
    server: {
        CRON: z.string().default('0 0 0 * * *'),

        PBS_URL: z.string().url(),
        PBS_API_TOKEN_ID: z.string().min(1),
        PBS_API_TOKEN_SECRET: z.string().min(1),

        PVE_URL: z.string().url(),
        PVE_API_TOKEN_ID: z.string().min(1),
        PVE_API_TOKEN_SECRET: z.string().min(1),

        TZ: z.string().default('Europe/Amsterdam'),
    },

    runtimeEnv: process.env,

    emptyStringAsUndefined: true,
});
