// const redis = require('redis');

// make a connection to the local instance of redis
// const client = redis.createClient(6379);
// client.on("error", (error) => {
//     console.error(error);
// });

class userRedis {
    findAll = async (info) => {
        try {
            console.log("user redis");
            const res = await info.client.get(info.key);
            return res;

        } catch (err) {
            return null;
        }
    }
}
module.exports = new userRedis();