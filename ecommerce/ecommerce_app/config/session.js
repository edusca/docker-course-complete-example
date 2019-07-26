const session = require('express-session');

module.exports = () => {
    const redis = require("redis");
    const client = redis.createClient({
        host: 'ecommerce_session',
        port: 6379
    });
    client.on("error", function (err) {
        console.log("Redis client error " + err);
    });

    const RedisStore = require('connect-redis')(session);
    return session({
        store: new RedisStore({
            client
        }),
        secret: 'session_secret',
        resave: true
    });
};