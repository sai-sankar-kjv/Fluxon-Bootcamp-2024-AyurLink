"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params; // Get username from URL parameter
    const { password, fullName, contact, email } = req.body;
    // Validate input data
    if (!password || !fullName || !contact || !email) {
        res.status(400).json({ message: 'All fields (password, fullName, contact, email) are required.' });
        return;
    }
    try {
        const db = yield (0, db_1.connectDB)();
        // Check if the user exists
        const user = yield db.get('SELECT * FROM user WHERE username = ?', [username]);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        // Hash the new password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Update user details
        yield db.run(`UPDATE user SET password = ?, full_name = ?, contact = ?, email = ? WHERE username = ?`, [hashedPassword, fullName, contact, email, username]);
        res.status(200).json({ message: 'User updated successfully.' });
    }
    catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Failed to update user.' });
    }
});
exports.updateUser = updateUser;
