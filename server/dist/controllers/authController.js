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
exports.login = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../config/db");
// Sign-Up Controller
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, confirmPassword, fullName, contact, email } = req.body;
    if (password !== confirmPassword) {
        res.status(400).json({ error: "Passwords do not match." });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const db = yield (0, db_1.connectDB)();
        console.log('SignUp Request Body:', req.body);
        const existingUser = yield db.get(`SELECT * FROM user WHERE username = ?`, [username]);
        if (existingUser) {
            res.status(400).json({ error: "Username already exists." });
            return;
        }
        yield db.run(`INSERT INTO user(username, password, full_name, contact, email) VALUES (?, ?, ?, ?,?)`, [username, hashedPassword, fullName, contact, email]);
        res.status(201).json({ message: "User registered successfully." });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "User registration failed. Username may already exist." });
    }
});
exports.signUp = signUp;
// Login Controller
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const db = yield (0, db_1.connectDB)();
        const user = yield db.get(`SELECT * FROM user WHERE username = ?`, [username]);
        if (!user) {
            res.status(404).json({ error: "User not found." });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid password." });
            return;
        }
        res.status(200).json({ message: "Login successful.", user: { username: user.username, fullName: user.full_name } });
    }
    catch (err) {
        res.status(500).json({ error: "Login failed." });
    }
});
exports.login = login;
