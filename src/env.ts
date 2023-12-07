import {createEnv} from '@t3-oss/env-core';
import {z} from 'zod';

export const env = createEnv({
    server: {
        PBS_URL: z.string().url(),
        PBS_API_TOKEN_ID: z.string().min(1),
        PBS_API_TOKEN_SECRET: z.string().min(1),

        PVE_URL: z.string().url(),
        PVE_API_TOKEN_ID: z.string().min(1),
        PVE_API_TOKEN_SECRET: z.string().min(1)
    },

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    runtimeEnv: process.env,

    emptyStringAsUndefined: true
});
