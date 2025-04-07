const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req,res,next)=>{
    try{
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
        throw new Error("Token is InValid");
    }
  const decodedToken = await jwt.verify(token,"devMatch@25");
  const {_id} = decodedToken;
  const user = await User.findById(_id);
  if(!user){
    throw new Error("InValid Crediential");
  }
req.user=user;
 next();
}catch(err){
  res.status(401).send("Token is InValid");
  }
}

module.exports={
    userAuth
}
