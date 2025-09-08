const mongoose = require('mongoose')

const ConnectTodb =  async()=>{
    try {
         await mongoose.connect(process.env.MongoUrl);
         console.log("DB connected")
    }
     catch (error) {
       console.log(`error comming${error}`)        
    }
}

module.exports = ConnectTodb