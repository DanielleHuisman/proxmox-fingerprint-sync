# Proxmox Fingerprint Sync

Synchronise the fingerprint of Proxmox Backup Server to Proxmox VE.

## Permissions

### PBS

`Sys.Audit` (included in `Audit` role) on `/system/status` for both the user and the API token.

### PVE

`Datastore.Audit` and `Datastore.Allocate` (included in `PVEDatastoreAdmin` role) on `/storage` and `/storage/<storage>` for both the user and the API token.

## License

This project is available under the [MIT license](LICENSE.md). Note that some dependencies have different licenses.
