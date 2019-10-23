import jwt from 'jsonwebtoken';

import Admin from '../models/admin';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
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
