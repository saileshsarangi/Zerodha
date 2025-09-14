const redis = require("redis");

const client = redis.createClient({
  url: "redis://host.docker.internal:6379"
});
client.on("error", (err) => console.log("Redis Client Error", err));

const ConnectToredis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log("Connected to Redis");
  }
}

module.exports = {client,ConnectToredis}