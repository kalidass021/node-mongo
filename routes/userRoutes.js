import { Router } from 'express';
import { signup, fetchAllUsers, getSpecificUser } from '../controllers/userController.js';

const router = Router();

router.post('/signup', signup);
router.get('/all', fetchAllUsers);
router.get('/user', getSpecificUser);

export default router;
