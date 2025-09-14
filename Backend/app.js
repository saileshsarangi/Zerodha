require('dotenv').config();
const redis = require("redis");
const express = require('express');
const bodyParser = require('body-parser');
const router = require("./route/user.route");
const ConnectTodb = require("./config/DB");
const cors = require('cors');
const { saveOrders, getOrderBook,limitOrder} = require('./services/redis.service')
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
ConnectTodb();



// (async () => {
//   const orders = [
//   // 25 Bids (buyers)
//   { userid: 'b1', price: 101.5, qty: 10, side: 'bid' },
//   { userid: 'b2', price: 102.0, qty: 5, side: 'bid' },
//   { userid: 'b3', price: 100.5, qty: 8, side: 'bid' },
//   { userid: 'b4', price: 101.5, qty: 7, side: 'bid' },
//   { userid: 'b5', price: 102.0, qty: 12, side: 'bid' },
//   { userid: 'b6', price: 100.0, qty: 4, side: 'bid' },
//   { userid: 'b7', price: 101.0, qty: 6, side: 'bid' },
//   { userid: 'b8', price: 102.5, qty: 3, side: 'bid' },
//   { userid: 'b9', price: 101.0, qty: 9, side: 'bid' },
//   { userid: 'b10', price: 102.5, qty: 2, side: 'bid' },
//   { userid: 'b11', price: 100.5, qty: 5, side: 'bid' },
//   { userid: 'b12', price: 101.5, qty: 4, side: 'bid' },
//   { userid: 'b13', price: 102.0, qty: 6, side: 'bid' },
//   { userid: 'b14', price: 100.0, qty: 7, side: 'bid' },
//   { userid: 'b15', price: 101.0, qty: 8, side: 'bid' },
//   { userid: 'b16', price: 102.5, qty: 1, side: 'bid' },
//   { userid: 'b17', price: 100.5, qty: 9, side: 'bid' },
//   { userid: 'b18', price: 101.5, qty: 3, side: 'bid' },
//   { userid: 'b19', price: 102.0, qty: 5, side: 'bid' },
//   { userid: 'b20', price: 100.0, qty: 6, side: 'bid' },
//   { userid: 'b21', price: 101.0, qty: 7, side: 'bid' },
//   { userid: 'b22', price: 102.5, qty: 4, side: 'bid' },
//   { userid: 'b23', price: 100.5, qty: 2, side: 'bid' },
//   { userid: 'b24', price: 101.5, qty: 5, side: 'bid' },
//   { userid: 'b25', price: 102.0, qty: 3, side: 'bid' },

//   // 25 Asks (sellers)
//   { userid: 's1', price: 103.0, qty: 5, side: 'ask' },
//   { userid: 's2', price: 104.0, qty: 8, side: 'ask' },
//   { userid: 's3', price: 103.5, qty: 4, side: 'ask' },
//   { userid: 's4', price: 103.0, qty: 7, side: 'ask' },
//   { userid: 's5', price: 104.0, qty: 3, side: 'ask' },
//   { userid: 's6', price: 102.5, qty: 6, side: 'ask' },
//   { userid: 's7', price: 103.5, qty: 5, side: 'ask' },
//   { userid: 's8', price: 103.0, qty: 2, side: 'ask' },
//   { userid: 's9', price: 104.5, qty: 4, side: 'ask' },
//   { userid: 's10', price: 102.5, qty: 7, side: 'ask' },
//   { userid: 's11', price: 103.5, qty: 3, side: 'ask' },
//   { userid: 's12', price: 104.0, qty: 2, side: 'ask' },
//   { userid: 's13', price: 103.0, qty: 6, side: 'ask' },
//   { userid: 's14', price: 104.5, qty: 5, side: 'ask' },
//   { userid: 's15', price: 102.5, qty: 3, side: 'ask' },
//   { userid: 's16', price: 103.5, qty: 8, side: 'ask' },
//   { userid: 's17', price: 104.0, qty: 4, side: 'ask' },
//   { userid: 's18', price: 103.0, qty: 3, side: 'ask' },
//   { userid: 's19', price: 104.5, qty: 2, side: 'ask' },
//   { userid: 's20', price: 102.5, qty: 6, side: 'ask' },
//   { userid: 's21', price: 103.5, qty: 5, side: 'ask' },
//   { userid: 's22', price: 104.0, qty: 3, side: 'ask' },
//   { userid: 's23', price: 103.0, qty: 4, side: 'ask' },
//   { userid: 's24', price: 102.5, qty: 2, side: 'ask' },
//   { userid: 's25', price: 104.5, qty: 6, side: 'ask' }
// ];

//   await saveOrders(orders);
//   const orderbook = await getOrderBook()
//   console.log(orderbook)

//    await limitOrder({
//      userId: 'newBuyer1',
//      price: 103.0,
//      qty: 15,
//      side: 'bid'
//    });

//   // // --- 3️⃣ Show the updated orderbook after matching ---
//   console.log('Orderbook after limit order:');
//   const updatedBook = await getOrderBook();
//    console.log(updatedBook);

// })();


app.use('/api',(req,res,next)=>{ console.log("comming")
    next()
}, router);

module.exports = app;
