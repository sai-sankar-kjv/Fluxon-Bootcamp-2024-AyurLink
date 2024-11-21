import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Create a function to connect to the database
export const connectDB = async (): Promise<Database> => {
  const db = await open({
    filename: path.join(__dirname, '../..', 'database.sqlite'),
    driver: sqlite3.Database
  });
  return db;
};
export const initializeDB = async () => {
  const db = await connectDB();
  await db.exec(`CREATE TABLE user (
username TEXT PRIMARY KEY,
     full_name TEXT NOT NULL,
  password TEXT NOT NULL,
   contact TEXT,
     email TEXT
 );
   
  `);
};
