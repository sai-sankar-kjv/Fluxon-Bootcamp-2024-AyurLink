import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { connectDB } from "../config/db";


// Sign-Up Controller
export const signUp = async (req: Request, res: Response): Promise<void> => {
  const { username, password, confirmPassword, fullName, contact, email } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match." });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const db = await connectDB();
    console.log('SignUp Request Body:', req.body);
    const existingUser = await db.get(`SELECT * FROM user WHERE username = ?`, [username]);

    if (existingUser) {
      res.status(400).json({ error: "Username already exists." });
      return;
    }
    await db.run(
      `INSERT INTO user(username, password, full_name, contact, email) VALUES (?, ?, ?, ?,?)`,
      [username, hashedPassword, fullName, contact, email]
    );
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "User registration failed. Username may already exist." });
  }
};

// Login Controller
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;

  try {
    const db = await connectDB();
    const user = await db.get(`SELECT * FROM user WHERE username = ?`, [username]);

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password." });
      return;
    }

    res.status(200).json({ message: "Login successful.", user: { username: user.username, fullName: user.full_name } });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
};