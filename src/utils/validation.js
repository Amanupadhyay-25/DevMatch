var validator = require("validator");
const validateSignUpdata = (req)=>{
     const { name , email, password} = req.body;

     if(!name){
        throw new Error("Name is not valid ");
     }
     else if ( name.length<4 || name.length>50){
        throw new Error("Name length should be in between 4-50 words");
     }
     else if(!validator.isEmail(email)){
          throw new Error("Email is not valid");
     }
};

module.exports = {validateSignUpdata};