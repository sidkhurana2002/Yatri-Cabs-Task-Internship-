// controllers/userController.js
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error("Error getting users:", error.message);
      res.status(500).send("Server Error");
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error getting user by ID:", error.message);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(500).send("Server Error");
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User with this email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).send("Server Error");
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res
            .status(400)
            .json({ msg: "User with this email already exists" });
        }
      }

      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : user.password;

      user.name = name || user.name;
      user.email = email || user.email;
      user.password = hashedPassword;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error.message);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(500).send("Server Error");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      await user.deleteOne();
      res.json({ msg: "User removed" });
    } catch (error) {
      console.error("Error deleting user:", error.message);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "User not found" });
      }
      res.status(500).send("Server Error");
    }
  },
};
