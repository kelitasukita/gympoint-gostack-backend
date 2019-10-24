import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const verifyStudents = await Students.findOne({
      where: { email: req.body.email }
    });

    if (verifyStudents) {
      return res.status(400).json({ error: 'Aluno já cadastrado' });
    }

    const { name, email, idade, peso, altura } = req.body;

    const { id } = await Students.create({
      name,
      email,
      idade,
      peso,
      altura
    });

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura
    });
  }

  async updade(req, res) {
    const { email } = req.body;

    const student = await Students.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Estudante não encontrado' });
    }

    if (email !== student.email) {
      const verifyStudents = await Students.findOne({ where: { email } });

      if (verifyStudents) {
        return res.status(401).json({ error: 'Estudante já cadastrado ' });
      }
    }

    const { id, name, idade, peso, altura } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura
    });
  }
}

export default new StudentsController();
