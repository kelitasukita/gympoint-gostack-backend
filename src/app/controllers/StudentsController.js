import Student from '../models/Student';

class StudentsController {
  async store(req, res) {
    const verifyStudent = await Student.findOne({
      where: { email: req.body.email }
    });

    if (verifyStudent) {
      return res.status(400).json({ error: 'Student already registered' });
    }

    const { name, email, idade, peso, altura } = req.body;

    const { id } = await Student.create({
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

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exist' });
    }

    if (email !== student.email) {
      const verifyStudent = await Student.findOne({ where: { email } });

      if (verifyStudent) {
        return res.status(400).json({ error: 'Student already registered' });
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
