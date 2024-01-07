import { createClient } from 'redis';

const client = createClient({ url: 'redis://redis:6379' });

async function connectToRedis() {
    if (client.isOpen) {
        console.log('Redis client already connected');
        return;
    }
    else {
        console.log('Connecting to Redis...');
        await client.connect();
    }
}

async function getFromCache(key) {
    console.log(`Getting ${key} from Redis`);
    try {
        const data = await client.get(key);
        return JSON.parse(data);
    }
    catch (error) {
        console.error(error);
    }
}

async function saveToCache(key, data, expirationTimeSeconds = null) {
    console.log(`Saving ${key} to Redis`);
    try {
        if (expirationTimeSeconds) {
            await client.setEx(key, expirationTimeSeconds, JSON.stringify(data));
        } else {
            await client.set(key, JSON.stringify(data));
            await client.persist(key);
        }
    } catch (error) {
        console.error(error);
    }
}


async function removeFromCache(key) {
    console.log(`Removing ${key} from Redis`);
    try {
        await client.del(key);
    }
    catch (error) {
        console.error(error);
    }
}

function closeConnection() {
    console.log('Closing Redis connection');
    client.quit();
}

export { connectToRedis, getFromCache, saveToCache, removeFromCache, closeConnection };