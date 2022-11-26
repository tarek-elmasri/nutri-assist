import express from 'express';
import usersController from '../../controllers/v1/users';

const router = express.Router();

// users routes
router.post('/users', usersController.create);

export default router;
