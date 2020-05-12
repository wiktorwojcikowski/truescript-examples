import logger from './Logger';

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const mapToObject = (map: Map<string, any>) => {
    const out = Object.create(null)
    map.forEach((value: any, key: string) => {
        out[key] = value
    })
    return out
};
