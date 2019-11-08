import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/middleAuth';

const routes = new Router();

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentsController.store);
routes.put('/students/:id', StudentsController.updade);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

export default routes;
