require('dotenv').config();
const express =  require('express')
const router = require("./route/user.route")
const ConnectTodb = require("./config/DB")
const cors =  require('cors')
const app =  express();
app.use(cors())
app.use(express.json())
ConnectTodb();
app.use('/api',router);
module.exports = app;