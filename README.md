# 📈 Zerodha Order Book Clone (Demo Project)

This project simulates a **basic stock exchange order matching system** inspired by Zerodha.  
It provides REST API endpoints to place **buy/sell orders**, check **balances**, and view the **market depth**.  
The system is designed to demonstrate financial trading concepts such as **limit orders, market orders, bid-ask spread, order book, market depth, maker-taker model, and liquidity**.

---

## 🚀 Endpoints

### 1. **Orders**
`POST /orders/buyer`  
`POST /orders/seller`  

- Place a **Buy (Bid)** or **Sell (Ask)** order.  
- Request Body fields:
  - **userId** → Unique identifier of the user (e.g., U123)  
  - **symbol** → Stock name/symbol (e.g., RELIANCE, TCS)  
  - **price** → Price at which order is placed (e.g., 100)  
  - **qty** → Quantity of shares (e.g., 10)  
  - **orderType** → `limit` or `market`  
  - **timestamp** → Time of order placement  

---

### 2. **Balance**
`GET /balance/:userId`

- Returns available **funds** and **holdings** of a user.  
- Response fields:
  - **userId** → Unique identifier of the user  
  - **cashBalance** → Available funds for trading  
  - **holdings** → List of stocks with quantities  
    - Example: RELIANCE: 20, TCS: 15  

---

### 3. **Market Depth**
`GET /depth`

- Returns **Order Book Snapshot** with **Bid (Buy)** and **Ask (Sell)** side.  
- Response fields:
  - **bids** → List of buy orders  
    - price → Bid price  
    - orders → Number of buyers at that price  
    - qty → Total quantity demanded  
  - **asks** → List of sell orders  
    - price → Ask price  
    - orders → Number of sellers at that price  
    - qty → Total quantity offered  

---

## 📊 Financial Concepts Used

- **Order Book** → List of all open buy/sell orders.  
- **Bid Price** → Highest price buyers are willing to pay.  
- **Ask Price** → Lowest price sellers are willing to accept.  
- **Spread** → Difference between best bid and best ask.  
- **Limit Order** → Placed at a specific price.  
- **Market Order** → Executed instantly at market price.  
- **Market Depth** → Shows demand/supply at different price levels.  
- **Maker** → Provides liquidity (places limit orders).  
- **Taker** → Consumes liquidity (places market orders).  
- **Liquidity** → How easily assets can be bought/sold without price impact.

---

## 🛠️ Tech Stack
- **Node.js**  
- **Express.js**  
- **CORS**  
- **express-validator**  

---

## 📌 Usage
1. Install dependencies:
   ```bash
   npm install
