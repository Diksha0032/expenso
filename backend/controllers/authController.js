const User=require('../models/User')
const jwt=require("jsonwebtoken");

const generateToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});
}
  exports.registerUser=async(req,res)=>{
    try{
      const{fullName,email,password}=req.body;
      
      if(!fullName || !email || !password){
        return res.status(400).json({
          message:"All fields are required"
        })
      }
      const userExists=await User.findOne({email});
      if(userExists) return res.status(400).json({
        message:"User already exists"
      })

      const user=await User.create({fullName,email,password});

      res.status(201).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        token:generateToken(user._id),
      })
    }catch(e){
      res.status(500).json({message:"Server error during registration",error:e.message})
    }
  };

  exports.loginUser=async(req,res)=>{
    const{email,password}=req.body;
     if(!email || !password){
        return res.status(400).json({
          message:"All fields are required"
        })
      }
   try{
      const user=await User.findOne({email});

      if(user && (await user.comparePassword(password))){
        res.status(200).json({
          _id:user._id,
          fullName:user.fullName,
          token:generateToken(user._id),
        })
      }else{
        res.status(401).json({message:"Invalid email or password"});
      }
    }catch{
      res.status(500).json({message:"Server error during login"})
    }
  };

  exports.getUserInfo=async(req,res)=>{
   try{
      const user=await User.findById(req.user._id).select("-password");

      if(!user){
       return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    }catch(e){
        res.status(500).json({message:"Server error",error:e})
    }
  };
