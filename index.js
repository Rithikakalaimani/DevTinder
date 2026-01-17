const express = require("express");
const db = require("./src/config/database");
const User = require("./src/models/user");
const bcrypt = require("bcrypt");
const{validationSignup} = require("./src/utils/validation");


const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/signup", async (req, res) => {
  try {
    // validation logic
    validationSignup(req);

    //Encrypt password
    const { firstName, lastName, emailId, password, age, skills } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      age,
      skills,
    });

    const savedUser = await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (err) {
    res.status(400).json({ message: err.message || "Signup failed" });
  }
});


app.post("/login", async (req, res) => {
  try {

    const {emailId, password } = req.body;
    const user = await User.findOne({emailId : emailId});

    //user not found
    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    //compare password
    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword){
      return res.status(400).json({message:"Invalid credentials"});
    }
    //Login successful
    res.status(200).json({message:"Login successful"});

  } catch (err) {
    res.status(400).json({ message: err.message || "Signup failed" });
  }
});

app.get("/user",async(req,res)=>{
  try{
    const users = await User.find({emailId:req.body.emailId});
    if(!users || users.length === 0) {
      return res.status(404).json({message:"No users found"});
    }
    else{
      res.status(200).json(users);
    }

  }
  catch(err){
    res.status(500).json({message:"Error fetching users",error:err});
  }
});

app.get("/users",async(req,res)=>{
  try{
    const users = await User.find({});
    if(!users || users.length === 0) {
      return res.status(404).json({message:"No users found"});
    }
    else{
      res.status(200).json(users);
    }
  }
  catch(err){
    res.status(500).json({message:"Error fetching users",error:err});
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const updateData = req.body;
  //       "about": "This is about me section.",
  //       "skills": [],
  //       "profilePicture": "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
  //       "_id": "68d970c227185b07bd6b9e3c",
  //       "firstName": "ManiBoi",
  //       "lastName": "S",
  //       "emailId": "kljknlkkkkkkkk",
  //       "password": "rithika123",
  //       "age": 23,
  //       "gender": "male",
    const allowedUpdates = ["userId","firstName", "lastName", "password", "age", "gender", "about", "skills", "profilePicture"];
    const isValidOperation = Object.keys(updateData).every((update) => allowedUpdates.includes(update));    
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true , runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
}); 


// Database connection and server start
 db()
  .then(() => {
    console.log("Database connection is successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

