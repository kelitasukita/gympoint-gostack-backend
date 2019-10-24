import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

const rotas = new Router();

rotas.post('/login', SessionController.store);

export default rotas;
