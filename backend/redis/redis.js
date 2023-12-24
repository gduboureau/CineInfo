// redis.js
import { createClient } from 'redis';

const client = createClient({ url: 'redis://localhost:6379' });

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
    return await client.get(key);
}

async function saveToCache(key, data) {
    console.log(`Saving ${key} to Redis`);
    await client.set(key, JSON.stringify(data), (err, reply) => { 
        if (err) {
            console.error(err);
        } else {
            console.log(reply);
        }
    });
}

async function removeFromCache(key) {
    console.log(`Removing ${key} from Redis`);
    await client.del(key, (err, reply) => {
        if (err) {
            console.error(err);
        } else {
            console.log(reply);
        }
    });
}

function closeConnection() {
    console.log('Closing Redis connection');
    client.quit();
}

export { connectToRedis, getFromCache, saveToCache, removeFromCache, closeConnection };
