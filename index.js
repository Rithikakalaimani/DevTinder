const express = require("express");
const db = require("./src/config/database");
const User = require("./src/models/user");

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/signup",async (req,res)=>{
  const user = new User(req.body);
  await user.save()
    .then((savedUser) => {
      res.status(201).json({ message: "User created successfully", user: savedUser });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating user", error: err });
    });
})

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
  try {
    const updatedUser = await User.find({ _id: userId }, updateData,{ new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
});




http: db()
  .then(() => {
    console.log("Database connection is successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

