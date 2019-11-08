import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/middleAuth';

const rotas = new Router();

rotas.post('/login', SessionController.store);

rotas.use(authMiddleware);

rotas.post('/students', StudentsController.store);
rotas.put('/students/:id', StudentsController.updade);

rotas.post('/plans', PlanController.store);
rotas.get('/plans', PlanController.index);
rotas.put('/plans/:id', PlanController.update);
rotas.delete('/plans/:id', PlanController.delete);

export default rotas;
