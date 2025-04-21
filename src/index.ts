import {CronJob} from 'cron';

import {env} from './env.js';
import {sync} from './proxmox.js';

const job = CronJob.from({
    cronTime: env.CRON,
    onTick: sync,
    timeZone: env.TZ
});

job.start();
console.log(`Started cron job with schedule "${env.CRON}" in timezone "${env.TZ}".`);
