import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';

import authMiddleware from './app/middlewares/middleAuth';

const rotas = new Router();

rotas.post('/login', SessionController.store);

rotas.use(authMiddleware);

rotas.post('/students', StudentsController.store);
rotas.put('/students/:id', StudentsController.updade);

export default rotas;
