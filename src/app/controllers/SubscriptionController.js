import { addMonths, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Subscription from '../models/Subscription';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

// Um estudante não pode começar 2 planos no mesmo dia

class SubscriptionController {
  async store(req, res) {
    const { startDate, planId, studentId } = req.body;

    if (isBefore(parseISO(startDate), new Date())) {
      return res.status(400).json({ error: 'Date before current date' });
    }

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exist' });
    }

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exist' });
    }

    const price = plan.duration * plan.price;
    const end_date = addMonths(parseISO(startDate), plan.duration);

    const subscription = await Subscription.create({
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
      end_date,
      price
    });

    const startDateFormated = format(subscription.start_date, 'dd/MM/yyyy', {
      locale: pt
    });

    const endDateFormated = format(subscription.end_date, 'dd/MM/yyyy', {
      locale: pt
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula gerada',
      template: 'subscriptionMail',
      context: {
        student: student.name,
        plan,
        subscription,
        startDateFormated,
        endDateFormated
      }
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
