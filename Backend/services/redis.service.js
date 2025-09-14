// Save raw orders in both list and hash
const { client, ConnectToredis } = require('../config/Redis')

async function saveOrders(orders) {
    try {
        await ConnectToredis();
        await client.del('orders');
        for (const order of orders) {
            await client.rPush('orders', JSON.stringify(order));
        }
    }
    catch (error) {
        throw new Error(`error is ${error}`)
    }
}

const setData = async (order) => {
  try {
    await client.rPush("orders", JSON.stringify(order));
    return getOrderBook();
  } catch (error) {
    throw new Error(`error is ${error}`);
  }
};


async function getOrderBook() {
    try {
        const rawList = await client.lRange('orders', 0, -1);

        const orders = rawList.map(o => JSON.parse(o));

        // Separate bids and asks
        const bids = orders.filter(o => o.side === 'bid').map((o) => {
            const { price, qty } = o;
            return { price, qty }
        }).reduce((acc, o) => {
            const exist = acc.find(item => item.price === o.price)
            if (exist) {
                exist.qty = exist.qty + o.qty;
            }
            else {
                acc.push({ price: o.price, qty: o.qty })
            }
            return acc
        }, []).sort((a, b) => b.price - a.price);
        const asks = orders.filter(o => o.side === 'ask').map((o) => {
            const { price, qty } = o;
            return { price, qty }
        }).reduce((acc, o) => {
            const exist = acc.find(item => item.price === o.price)
            if (exist) {
                exist.qty = exist.qty + o.qty;
            }
            else {
                acc.push({ price: o.price, qty: o.qty })
            }
            return acc
        }, []).sort((a, b) => a.price - b.price);
        // Hash
        const orderbook = { asks: [...asks], bids: [...bids] }
        return orderbook
    } catch (error) {
        throw new Error(`error is ${error}`)
    }
}

async function limitOrder({ userId, price, qty, side }) {
  try {
    // get all stored orders as raw strings
    const rawList = await client.lRange("orders", 0, -1);
    const opposite = side === "ask" ? "bid" : "ask";

    // keep both raw string and parsed object so we can remove exactly
    const filtered = rawList
      .map((raw) => ({ raw, obj: JSON.parse(raw) }))
      .filter(
        ({ obj }) =>
          obj.side === opposite &&
          (side === "ask" ? obj.price >= price : obj.price <= price)
      )
      // choose best price first: sellers want highest bid, buyers want lowest ask
      .sort((a, b) =>
        side === "ask"
          ? b.obj.price - a.obj.price // selling: match highest bid first
          : a.obj.price - b.obj.price // buying: match lowest ask first
      );

    if (filtered.length === 0) {
      await setData({ userId, price, qty, side });
      return;
    }

    let remaining = qty;

    for (let i = 0; i < filtered.length && remaining > 0; i++) {
      const { raw, obj: match } = filtered[i];

      if (remaining >= match.qty) {
        remaining -= match.qty;
        // remove full matched order using the exact raw string
        await client.lRem("orders", 1, raw);
      } else {
        const updated = { ...match, qty: match.qty - remaining };
        await client.lRem("orders", 1, raw);
        await client.rPush("orders", JSON.stringify(updated));
        remaining = 0;
      }
    }

    // any unfilled quantity becomes a new order
    if (remaining > 0) {
      await setData({ userId, price, qty: remaining, side });
    }
  } catch (error) {
    throw new Error(`limitOrder error: ${error}`);
  }
}



module.exports = { saveOrders, getOrderBook ,limitOrder };
