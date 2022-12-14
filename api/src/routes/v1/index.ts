import express from 'express';
import {
  clientsController,
  profilesController,
  servesController,
  sessionsController,
  usersController
} from '../../controllers/v1';
import clientExists from '../../middlewares/v1/clientExists';
import profileExists from '../../middlewares/v1/profileExists';
import requireUser from '../../middlewares/v1/requireUser';

const router = express.Router();

// sessions routes
router.get('/auth', [requireUser], sessionsController.index);
router.post('/auth', sessionsController.create);
router.patch('/auth', sessionsController.update);
router.delete('/auth', sessionsController.destroy);

// users routes
router.post('/users', usersController.create);

// user clients
router.get('/clients', [requireUser], clientsController.index);
router.post('/clients', [requireUser], clientsController.create);
router.patch(
  '/clients/:clientId',
  [requireUser, clientExists],
  clientsController.update
);
router.delete(
  '/clients/:clientId',
  [requireUser, clientExists],
  clientsController.destroy
);

// clients profiles
router.get(
  '/clients/:clientId/profiles',
  [requireUser, clientExists],
  profilesController.index
);
router.get(
  '/clients/:clientId/profiles/:profileId',
  [requireUser, clientExists],
  profilesController.show
);
router.post(
  '/clients/:clientId/profiles',
  [requireUser, clientExists],
  profilesController.create
);
router.patch(
  '/clients/:clientId/profiles/:profileId',
  [requireUser, clientExists, profileExists],
  profilesController.update
);
router.delete(
  '/clients/:clientId/profiles/:profileId',
  [requireUser, clientExists, profileExists],
  profilesController.destroy
);

// clients -> projects -> serves
router.get(
  '/clients/:clientId/profiles/:profileId/serves',
  [requireUser, clientExists, profileExists],
  servesController.index
);
router.post(
  '/clients/:clientId/profiles/:profileId/serves',
  [requireUser, clientExists, profileExists],
  servesController.create
);
router.patch(
  '/clients/:clientId/profiles/:profileId/serves/:serveId',
  servesController.update
);
router.delete(
  '/clients/:clientId/profiles/:profileId/serves/:serveId',
  servesController.destroy
);

export default router;
