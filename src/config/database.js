const mongoose = require("mongoose");

const connectDB = async()=>{
  await mongoose.connect(
    "mongodb+srv://rithika:YG7C9mtpMThUHvUP@cluster0.0av5hjq.mongodb.net/DevTinder"
  );
}
module.exports = connectDB;

// connectDB().then(()=>{
//   console.log("Database connection is successful");
// }).catch((err)=>{
//   console.error("Database connection failed",err);
// })