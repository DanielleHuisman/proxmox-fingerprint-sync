import {env} from './env.js';

const getFingerprint = async () => {
    const response = await fetch(`${env.PBS_URL}/api2/json/version`, {
        headers: {
            Authorization: `PBSAPIToken=${env.PBS_API_TOKEN_ID}:${env.PBS_API_TOKEN_SECRET}`
        }
    });
    console.log(response.headers);
    const data = await response.json();

    console.log(data);
};

const setFingerprint = async () => {
    const response = await fetch(`${env.PVE_URL}/api2/json/version`, {
        headers: {
            Authorization: `PVEAPIToken=${env.PVE_API_TOKEN_ID}=${env.PVE_API_TOKEN_SECRET}`
        }
    });
    const data = await response.json();

    console.log(data);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
getFingerprint();
