import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.json({
        message: "Such username is already used."
      });
    }

    const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' },
        )

    await newUser.save()

        res.json({
            newUser,
            token,
      message: "Registration is done successfully."
    });
  } catch (error) {
    res.json({ message: "Error creating user." });
  }
};
// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({
        message: "There is no such user."
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
        message: "Incorrect password."
      });
    }

    const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' },
        )

        res.json({
            token,
            user,
      message: "You are logged in."
    });
  } catch (error) {
    res.json({ message: "Authorization error." });
  }
};

// Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
        message: "There is no such user."
      });
    }

    const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '2d' },
        )

        res.json({
            user,
            token,
        })
    } catch (error) {
       res.json({ message: "There is no access." });
  }
};
