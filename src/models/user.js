const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,

  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min : 18,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","other"].includes(value)){
        throw new Error("Gender is not valid");
    }
  },
  lowercase: true,
  trim : true
 }, 
  about: {
    type: String,
    default: "This is about me section.",
  },
  skills: {
    type: [String],
    required: true,
  },
  profilePicture: {
    type: String,
    default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
  },
},
{
  timestamps: true,
}
);

const User = mongoose.model('User', userSchema);
module.exports = User;