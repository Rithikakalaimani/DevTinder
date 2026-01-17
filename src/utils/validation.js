
const validator = require("validator");

const validationSignup = (req)=>{
  const { firstName, lastName, emailId, password} = req.body;
 if(!firstName || !lastName){
   throw new Error("Names are not valid");
 }
  else if(!emailId || !validator.isEmail(emailId)){
    throw new Error("EmailID is not valid");
  }
  else if(!password || !validator.isStrongPassword(password)){
    throw new Error("Password is not valid");
  }

}
module.exports = {validationSignup};