const router = require("express").Router();
const userModel = require("../models/User");
const CryptoJS = require("crypto-js"); //use this to encrypt password
//Registor

router.post("/registor", async (req, resp) => {
  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body,
      process.env.PASS_SEC
    ).toString(), //using to encrypt password
  });
  try {
    const savedUser = await newUser.save();
    resp.status(201).json(savedUser);
  } catch (err) {
    resp.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, resp) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if(!user){
       return resp.status(401).json("Wrong Credentails");
    }
    const hashedpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ); //Decrypting Password
    const originalPassword = hashedpassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;
    if(originalPassword != inputPassword)
    {
      console.log(inputPassword);
       return resp.status(401).json("Wrong password");
    }
    resp.status(200).json(user);
  } catch (err) {
    resp.status(500).json(err);
  }
});

module.exports = router;
