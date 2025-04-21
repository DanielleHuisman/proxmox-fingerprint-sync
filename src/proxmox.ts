import {env} from './env.js';

interface ProxmoxResponse<Data> {
    data: Data;
}

interface Status {
    info: {
        fingerprint: string;
    };
}

interface Storage {
    storage: string;
    type: string;
    server: string;
    fingerprint: string;
}

const getFingerprint = async () => {
    const response = await fetch(`${env.PBS_URL}/api2/json/nodes/localhost/status`, {
        headers: {
            Authorization: `PBSAPIToken=${env.PBS_API_TOKEN_ID}:${env.PBS_API_TOKEN_SECRET}`,
            'Accept-Encoding': ''
        }
    });

    if (response.status < 200 || response.status > 399) {
        throw new Error(await response.text());
    }

    const data = (await response.json()) as ProxmoxResponse<Status>;

    return data.data.info.fingerprint.toLowerCase();
};

const getStorages = async () => {
    const response = await fetch(`${env.PVE_URL}/api2/json/storage`, {
        headers: {
            Authorization: `PVEAPIToken=${env.PVE_API_TOKEN_ID}=${env.PVE_API_TOKEN_SECRET}`
        }
    });

    if (response.status < 200 || response.status > 399) {
        throw new Error(await response.text());
    }

    const data = (await response.json()) as ProxmoxResponse<Storage[]>;

    const hostname = new URL(env.PBS_URL).hostname;
    const storages = data.data
        .filter((storage) => storage.type === 'pbs' && storage.server === hostname)
        .map((storage) => ({
            ...storage,
            fingerprint: storage.fingerprint.toLowerCase()
        }));

    return storages;
};

const setFingerprint = async (storage: Storage, fingerprint: string) => {
    const response = await fetch(`${env.PVE_URL}/api2/json/storage/${storage.storage}`, {
        method: 'PUT',
        headers: {
            Authorization: `PVEAPIToken=${env.PVE_API_TOKEN_ID}=${env.PVE_API_TOKEN_SECRET}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            storage: storage.storage,
            fingerprint
        })
    });

    if (response.status < 200 || response.status > 399) {
        throw new Error(await response.text());
    }
};

export const sync = async () => {
    const fingerprint = await getFingerprint();
    console.log('PBS fingerprint:', fingerprint);
    console.log();

    const storages = await getStorages();

    console.log(
        ['PVE storages:']
            .concat(storages.map((storage) => `  - ${storage.storage} (${storage.fingerprint})`))
            .join('\n')
    );
    console.log();

    for (const storage of storages) {
        if (storage.fingerprint === fingerprint) {
            console.log(`${storage.storage} - Skipped, already correct.`);
            continue;
        }

        console.log(`${storage.storage} - Updating fingerprint...`);
        await setFingerprint(storage, fingerprint);
        console.log(`${storage.storage} - Succesfully updated fingerprint.`);
    }
};
