import express from 'express'
import { getAllUsers,createUser,getOneUser,deleteUser,updateUser } from '../controller/userController.js';

const router = express.Router();
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getOneUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router;