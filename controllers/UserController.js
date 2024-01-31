const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, password, phonenumber } = req.body;
    const hashPassword = await generateHash(password);
    console.log(hashPassword);
    console.log(password);
    const newUser = await User.create({
      name,
      password: hashPassword,
      phonenumber,
    });
    if (newUser) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ error: "User creation failed" });
    }
  } catch (error) {
    var errorText = error.errors[0].message;
    console.log(errorText);

    if (errorText === "username must be unique") {
      return res.status(500).json({ error: "Username already exists" });
    }

    if (errorText === "phone must be unique") {
      return res.status(500).json({ error: "Phone number already exists" });
    }

    res.status(500).json({ error: "An error occurred during user creation" });
  }
};
const generateHash = async (text) => {
  return bcrypt
    .hash(text, 12)
    .then((hashText) => {
      return hashText;
    })
    .catch((err) => {
      console.log("hash cannot be generated", err);
      throw err;
    });
};

module.exports = { createUser };
