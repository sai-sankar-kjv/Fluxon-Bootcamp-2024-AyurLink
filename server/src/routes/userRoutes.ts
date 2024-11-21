import express from 'express';
import { searchUsers} from '../controllers/searchUsersController';
import { signUp ,login} from '../controllers/authController';
import { updateUser } from '../controllers/editUserController';
import { Request, Response, NextFunction } from "express";
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => 
    (req: Request, res: Response, next: NextFunction) => 
      Promise.resolve(fn(req, res, next)).catch(next);





const router = express.Router();

router.get('/search', searchUsers);
router.post('/signup', signUp);

router.post('/login',asyncHandler(login));
router.put('/users/:username', updateUser);




export default router;
