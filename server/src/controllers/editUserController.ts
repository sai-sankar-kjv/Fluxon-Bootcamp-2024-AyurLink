import { Request, Response } from 'express';
import { connectDB } from '../config/db';
import bcrypt from "bcrypt";
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params; // Get username from URL parameter
    const { password, fullName, contact, email } = req.body;
  
    // Validate input data
    if (!password || !fullName || !contact || !email) {
      res.status(400).json({ message: 'All fields (password, fullName, contact, email) are required.' });
      return;
    }
  
    try {
      const db = await connectDB();
  
      // Check if the user exists
      const user = await db.get('SELECT * FROM user WHERE username = ?', [username]);
  
      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update user details
      await db.run(
        `UPDATE user SET password = ?, full_name = ?, contact = ?, email = ? WHERE username = ?`,
        [hashedPassword, fullName, contact, email, username]
      );
  
      res.status(200).json({ message: 'User updated successfully.' });
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'Failed to update user.' });
    }
  };