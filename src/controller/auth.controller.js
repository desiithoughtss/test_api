import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { SignupSchema, LoginSchema } from "../utils/validator.js";

const signup = async (req, res) => {
  try {
    const parsing = SignupSchema.parse(req.body);
    const existingUser = await prisma.user.findUnique({
      where: { email: parsing.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPass = await bcrypt.hash(parsing.password, 10);
    const user = await prisma.user.create({
      data: {
        name: parsing.name,
        email: parsing.email,
        password: hashedPass,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, message: "User created" });

    // res.status(201).json({ user, message: "User created " });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const login = async (req, res) => {
  try {
    const parsing = LoginSchema.parse(req.body);
    console.log(parsing.email);
    const user = await prisma.user.findUnique({
      where: { email: parsing.email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid" });
    }

    const valid = await bcrypt.compare(parsing.password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "login successful", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};

const getUserDetails = async (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

const users = (req, res) => {
  res.json([{ name: "John Doe" }]);
};

export { signup, login, logout, getUserDetails, users };
