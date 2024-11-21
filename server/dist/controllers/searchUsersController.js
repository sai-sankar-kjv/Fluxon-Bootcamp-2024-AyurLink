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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = void 0;
const db_1 = require("../config/db");
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, fullName } = req.query;
    // Validate that at least one of the query parameters is provided
    if (!username && !fullName) {
        res.status(400).json({ message: 'Search query must include at least one of "username" or "fullName".' });
        return;
    }
    try {
        const db = yield (0, db_1.connectDB)();
        let query = 'SELECT * FROM user WHERE';
        const params = [];
        // If both username and fullName are provided, combine the search conditions
        if (username) {
            query += ' username LIKE ?';
            params.push(`%${username}%`);
        }
        if (fullName) {
            if (username)
                query += ' AND'; // If username is also being searched, add "AND"
            query += ' full_name LIKE ?';
            params.push(`%${fullName}%`);
        }
        // Execute the search query with dynamic parameters
        const user = yield db.all(query, params);
        if (user.length === 0) {
            res.status(404).json({ message: 'No users found matching the search criteria.' });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error('Error searching user:', err);
        res.status(500).json({ error: 'Failed to search user.' });
    }
});
exports.searchUsers = searchUsers;
