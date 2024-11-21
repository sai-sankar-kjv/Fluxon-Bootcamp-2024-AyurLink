import { Request, Response } from 'express';
import { connectDB } from '../config/db';

export const searchUsers = async (req: Request, res: Response): Promise<void> => {
  const { username, fullName } = req.query;

  // Validate that at least one of the query parameters is provided
  if (!username && !fullName) {
    res.status(400).json({ message: 'Search query must include at least one of "username" or "fullName".' });
    return;
  }

  try {
    const db = await connectDB();
    let query = 'SELECT * FROM user WHERE';
    const params: string[] = [];

    // If both username and fullName are provided, combine the search conditions
    if (username) {
      query += ' username LIKE ?';
      params.push(`%${username}%`);
    }

    if (fullName) {
      if (username) query += ' AND'; // If username is also being searched, add "AND"
      query += ' full_name LIKE ?';
      params.push(`%${fullName}%`);
    }

    // Execute the search query with dynamic parameters
    const user = await db.all(query, params);

    if (user.length === 0) {
      res.status(404).json({ message: 'No users found matching the search criteria.' });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error searching user:', err);
    res.status(500).json({ error: 'Failed to search user.' });
  }
};