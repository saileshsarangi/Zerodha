require('dotenv').config();
const redis = require("redis");
const express = require('express');
const router = require("./route/user.route");
const ConnectTodb = require("./config/DB");
const cors = require('cors');
const { saveOrders, fetchOrdersDemo, fetchSingleOrder } = require('./config/Redis')
const app = express();
app.use(cors());
app.use(express.json());
ConnectTodb();



(async () => {
  const orders = [
    { userid: 'u1', price: 101.5, qty: 10, side: 'bid' },
    { userid: 'u2', price: 102.3, qty: 5, side: 'ask' },
    { userid: 'u3', price: 100.0, qty: 8, side: 'bid' },
    { userid: 'u4', price: 103.0, qty: 2, side: 'ask' }
  ];
  await saveOrders(orders);
  await fetchOrdersDemo()
  const key = 'u1:101.5:bid'; // same format as used in hash
  await fetchSingleOrder(key);
})();


app.use('/api', router);

module.exports = app;
