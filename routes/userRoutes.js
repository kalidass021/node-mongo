import { Router } from 'express';
import {
  signup,
  fetchAllUsers,
  getSpecificUser,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';

const router = Router();

router.post('/signup', signup);
router.get('/all', fetchAllUsers);
router.get('/user', getSpecificUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
