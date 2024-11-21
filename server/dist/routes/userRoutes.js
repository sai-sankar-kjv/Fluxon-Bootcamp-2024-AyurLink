"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchUsersController_1 = require("../controllers/searchUsersController");
const authController_1 = require("../controllers/authController");
const editUserController_1 = require("../controllers/editUserController");
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const router = express_1.default.Router();
router.get('/search', searchUsersController_1.searchUsers);
router.post('/signup', authController_1.signUp);
router.post('/login', asyncHandler(authController_1.login));
router.put('/users/:username', editUserController_1.updateUser);
exports.default = router;
