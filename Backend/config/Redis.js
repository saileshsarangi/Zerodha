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

// Save raw orders in both list and hash
async function saveOrders(orders) {
  await ConnectToredis();

  // Clear previous data
  await client.del('orders');        
  await client.del('orders_hash'); 

  for (const order of orders) {
    // Save in list
    await client.rPush('orders', JSON.stringify(order));

    // Save in hash: use unique key (e.g., userid + timestamp or index)
    const hashKey = `${order.userid}:${order.price}:${order.side}`;
    await client.hSet('orders_hash', hashKey, JSON.stringify(order));
  }

  console.log('Raw orders saved in Redis (list + hash)!');
}

// Fetch raw orders from both structures
async function fetchOrdersDemo() {
  await ConnectToredis();

  // List
  const rawList = await client.lRange('orders', 0, -1);
  const ordersList = rawList.map(o => JSON.parse(o));

  // Hash
  const rawHash = await client.hGetAll('orders_hash');
  const ordersHash = Object.values(rawHash).map(o => JSON.parse(o));

  console.log("\nRaw Orders List:");
  console.log(ordersList);

  console.log("\nRaw Orders Hash:");
  console.log(ordersHash);
}

async function fetchSingleOrder(hashKey) {
  await ConnectToredis();

  // Get the value from the hash
  const rawOrder = await client.hGet('orders_hash', hashKey);

  if (!rawOrder) {
    console.log(`No order found for key: ${hashKey}`);
    return null;
  }

  // Parse JSON string to object
  const order = JSON.parse(rawOrder);
  console.log("Fetched Order:", order);
}


module.exports = { saveOrders, fetchOrdersDemo,fetchSingleOrder};
