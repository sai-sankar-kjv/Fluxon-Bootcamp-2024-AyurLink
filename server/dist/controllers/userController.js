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
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query; // Get the search input from query parameters
        if (!search || typeof search !== 'string') {
            res.status(400).json({ message: 'Search query must be a non-empty string.' });
            return;
        }
        const db = req.app.locals.db; // Access db instance
        // Prepare the search pattern for partial matching (using LIKE)
        const searchPattern = `%${search}%`;
        // SQL query to search for matching username or fullname
        const query = 'SELECT * FROM user WHERE username LIKE ? OR fullname LIKE ?';
        // Execute the query with the search pattern
        const rows = yield db.all(query, [searchPattern, searchPattern]);
        // If no results, send a 404 response
        if (rows.length === 0) {
            res.status(404).json({ message: 'No matching users found.' });
            return;
        }
        // Return the results as JSON
        res.json(rows);
    }
    catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({ error: 'Database query failed' });
    }
});
exports.searchUsers = searchUsers;
