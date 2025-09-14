const jwt  = require('jsonwebtoken')

const userAuth  =  async (req,res,next)=>{
   try {
      const authHeader =  req.headers.authorization
      const token = authHeader.split(' ')[1]; 
      if(!token)
      {
        return res.status(401).json({message : 'token is not provided'})
      }
      const decoded =  jwt.decode(token)
      //check in blacklisted token database
      req.body =  decoded
      next()
   } catch (error) {
      return res.status(403).json({message :`${error}`})
   }
}