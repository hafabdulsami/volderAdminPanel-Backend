const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const { name, password, phonenumber } = req.body;
    const hashPassword = await generateHash(password);
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

const Edituser = async (req, res) => {
  const { id } = req.body;
  if (!id) { 
    res.status(500).json({ message: "The user doesnot exist" });
  }
  try {
    const hashPassword = await generateHash(req.body.password);
    const updateUser = await User.update(
      { ...req.body, password: hashPassword },
      { where: { id: id } }
    );
    if (updateUser) {
      res.status(201).json({ message: "User updated successfully" });
    } else {
      res.status(500).json({ message: "User is not updated" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occur during this operation" });
  }
};
const userList = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const user = await User.findByPk(id);
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

module.exports = { createUser, userList, Edituser };
