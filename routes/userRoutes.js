import { Router } from 'express';
import { signup, fetchAllUsers, getSpecificUser, deleteUser } from '../controllers/userController.js';

const router = Router();

router.post('/signup', signup);
router.get('/all', fetchAllUsers);
router.get('/user', getSpecificUser);
router.delete('/user/:id', deleteUser);

export default router;
