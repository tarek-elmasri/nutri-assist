import express from 'express';
import {
  clientsController,
  profilesController,
  servesController,
  sessionsController,
  usersController,
  serveMealsController,
  mealsController
} from '../../controllers/v1';
import clientExists from '../../middlewares/v1/clientExists';
import profileExists from '../../middlewares/v1/profileExists';
import requireUser from '../../middlewares/v1/requireUser';
import serveExists from '../../middlewares/v1/serveExists';

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
router.get('/clients/:clientId', [requireUser], clientsController.show);
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
router.get(
  '/clients/:clientId/profiles/:profileId/serves/serveId',
  [requireUser, clientExists, profileExists],
  servesController.show
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

//clients -> profiles -> serves -> serveMeal
router.post(
  '/clients/:clientId/profiles/:profileId/serves/:serveId/serveMeals',
  [requireUser, clientExists, profileExists, serveExists],
  serveMealsController.create
);

// meals routes
router.get('/meals', requireUser, mealsController.index);
router.post('/meals', requireUser, mealsController.create);

// router for profiles directly
router.get('/profiles', [requireUser], profilesController.getAllProfiles);
export default router;
