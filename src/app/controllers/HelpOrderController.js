import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string()
        .trim()
        .required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const student_id = req.params.student;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id,
      question
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const student_id = req.params.student;

    const helpOdersList = await HelpOrder.findAll({
      where: { student_id },
      order: ['created_at'],
      limit: 15,
      offset: (page - 1) * 15
    });

    return res.json(helpOdersList);
  }

  async unansweredOrdersByStudent(req, res) {
    const student_id = req.params.student;

    const unansweredOrdersByStudent = await HelpOrder.findAll({
      where: {
        student_id,
        answer: null
      }
    });

    return res.json(unansweredOrdersByStudent);
  }

  async unansweredOrders(req, res) {
    const { page = 1 } = req.body;

    const unansweredOrders = await HelpOrder.findAll({
      where: { answer: null },
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20
    });

    return res.json(unansweredOrders);
  }

  async answerOrder(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string()
        .trim()
        .required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Answer is required' });
    }
    const order = await HelpOrder.findByPk(req.params.order);

    order.answer_at = new Date();

    await order.update(req.body);

    return res.json({
      order
    });
  }
}

export default new HelpOrderController();
