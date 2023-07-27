const express = require("express");
const router = express.Router();
const User = require("../models/User");

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecret="MynameisYenniShashankStudentNITJ$#@";

const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  body("email", "Enter Correct Email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password", "Min 7 characaters required").isLength({ min: 7 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(15);
    let securePassword=await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  body("email", "Incorrect Email").isEmail(),
  body("password", "Incorrect Password").isLength({ min: 7 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Try Logging with Correct Credentials" });
      }

      const passwordCompare=await bcrypt.compare(req.body.password, userData.password)

      if (!passwordCompare) {
        return res.status(400).json({ errors: "Enter Correct Credentials" });
      }

      const data = { user:{id: userData.id} }

      const authToken=jwt.sign(data,jwtSecret);     // Header is automatically created by sign and payload is data and secret is jwtSecret
                                                    // Everytime when you try to login a different authToken will be generated
      return res.json({ success: true, authToken: authToken });    // We will send this authToken to front end so that one person access to other person's data will be controlled by checking this authToken belongs to which person
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
