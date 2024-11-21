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
exports.initializeDB = exports.connectDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
// Create a function to connect to the database
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, sqlite_1.open)({
        filename: path_1.default.join(__dirname, '../..', 'database.sqlite'),
        driver: sqlite3_1.default.Database
    });
    return db;
});
exports.connectDB = connectDB;
const initializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, exports.connectDB)();
    yield db.exec(`CREATE TABLE user (
username TEXT PRIMARY KEY,
     full_name TEXT NOT NULL,
  password TEXT NOT NULL,
   contact TEXT,
     email TEXT
 );
   
  `);
});
exports.initializeDB = initializeDB;
