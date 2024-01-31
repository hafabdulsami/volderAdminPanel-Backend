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
      res.status(500).json({ message: "User creation failed" });
    }
  } catch (error) {
    var errorText = error.errors[0].message;
    console.log(errorText);

    if (errorText === "name must be unique") {
      return res.status(500).json({ message: "Username already exists" });
    }

    if (errorText === "phone must be unique") {
      return res.status(500).json({ message: "Phone number already exists" });
    }

    res.status(500).json({ message: "An error occurred during user creation" });
  }
};

const userList = async (req, res) => {
  try {
    const { _id } = req.query;
    console.log(req.query);
    if (_id) {
      const user = await User.findByPk(_id);
      return res.status(200).json({ user });
    } else {
      const userList = await User.findAll();
      return res.status(200).json({ userList });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      errors: [{ message: "Something went wrong. Please try again." }],
    });
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

module.exports = { createUser,userList };
