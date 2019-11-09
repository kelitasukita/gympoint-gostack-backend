import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import SubscriptionController from './app/controllers/SubscriptionController';
import CheckinController from './app/controllers/CheckinController';

import authMiddleware from './app/middlewares/middleAuth';

const routes = new Router();

routes.post('/login', SessionController.store);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.use(authMiddleware);

routes.post('/students', StudentsController.store);
routes.put('/students/:id', StudentsController.updade);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post(
  '/subscriptions',
  SubscriptionController.store.bind(SubscriptionController)
);
routes.get('/subscriptions', SubscriptionController.index);
routes.put(
  '/subscriptions/:id',
  SubscriptionController.update.bind(SubscriptionController)
);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

export default routes;
