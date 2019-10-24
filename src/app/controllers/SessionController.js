import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Admin from '../models/Admin';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação ' });
    }

    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    if (!(await admin.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha não confere' });
    }

    const { id, name } = admin;

    return res.json({
      admin: {
        id,
        name,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expireIn
      })
    });
  }
}

export default new SessionController();
