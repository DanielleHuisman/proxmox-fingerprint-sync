# Proxmox Fingerprint Sync

Synchronise the fingerprint of Proxmox Backup Server to Proxmox VE.

## Permissions

### PBS

`Sys.Audit` (included in `Audit` role) on `/system/status` for both the user and the API token.

### PVE

`Datastore.Audit` and `Datastore.Allocate` (included in `PVEDatastoreAdmin` role) on `/storage` and `/storage/<storage>` for both the user and the API token.

## Deployment

### Docker Compose

Example of a deployment using [Docker Compose](https://docs.docker.com/compose/):

```yaml
services:
    proxmox-fingerprint-sync:
        image: daniellehuisman/proxmox-fingerprint-sync
        restart: 'unless-stopped'
        environment:
            # Cron schedule (defaults to '0 0 0 * * *', i.e. every day at 00:00:00)
            CRON: '0 0 0 * * *'

            # Proxmox Backup Server
            PBS_URL: https://pbs.example.com:8007
            PBS_API_TOKEN_ID: sync@pbs!sync
            PBS_API_TOKEN_SECRET: 'CHANGE_ME'

            # Proxmox Virtual Environment
            PVE_URL: https://pve.example.com:8006
            PVE_API_TOKEN_ID: sync@pam!sync
            PVE_API_TOKEN_SECRET: 'CHANGE_ME'

            # Timezone (defaults to 'Europe/Amsterdam')
            TZ: 'Europe/Amsterdam'
```

## License

This project is available under the [MIT license](LICENSE.md). Note that some dependencies have different licenses.
