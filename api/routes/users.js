const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const verify = require("../verifyToken")

// UPDATE
router.put("/:id",verify, async (req,res)=>{
  if(req.user.id === req.params.id || req.user.isAdmin){
    if(req.body.password){
      req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString()
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, 
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }else{
    res.status(403).json("You can only update your account!");
  }
})


// DELETE
router.delete("/:id",verify, async (req,res)=>{
  if(req.user.id === req.params.id || req.user.isAdmin){
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json(err.message);
    }
  }else{
    res.status(403).json("You can only delete your account!");
  }
})


// GET
router.get("/find/:id", async (req,res)=>{
  try {
    const getUser = await User.findById(req.params.id);
    const {password, ...info} = getUser._doc; 
    res.status(200).json({...info});
  } catch (error) {
    res.status(500).json(error.message);
  }
})


// GET ALL or GET LATEST 10 USERS
router.get("/",verify, async (req,res)=>{
  const query = req.query.new; //query parameter "new" is bool type
  if(req.user.isAdmin){

    try {
      const Users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
      res.status(200).json(Users);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }else{
    res.status(403).json("You are not allowed to view this page");
  }
})


// GET USER STATS: GEt total users per month
router.get("/stats", async (req,res)=>{
  // const today = new Date();
  // const lastYear = today.setFullYear(today.setFullYear()-1)

  // const monthsArray = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December"
  // ];

  try {
    const data = await User.aggregate([
      {
        $project:{
          month: { $month: "$createdAt" }
        }
      },{
        $group:{
          _id: "$month",
          total: {$sum:1},
          count: {$count:{}},
        }
      }
    ])
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error.message);
  }
})

module.exports = router;