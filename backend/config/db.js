const path=require('path')
require('dotenv').config({path:path.resolve(__dirname,'../../.env')})

 console.log("Checking MONGO_URL:", process.env.MONGO_URL ? "Found! ✅" : "Not Found ❌");

const mongoose=require("mongoose");

const connectDB=async () => {
  try{
    await mongoose.connect(process.env.MONGO_URL,{});
  
    console.log("MongoDB connected");
  } catch(err){
    console.log("Error connecting to MongoDB",err);
    process.exit(1);
  }

};

module.exports=connectDB