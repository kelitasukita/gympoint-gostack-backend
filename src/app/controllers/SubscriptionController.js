import { addMonths, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Subscription from '../models/Subscription';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

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

    const enrolledStudent = await Subscription.findOne({
      where: { student_id: student.id }
    });

    if (enrolledStudent) {
      return res.status(400).json({ error: 'Student already enrolled' });
    }

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exist' });
    }

    const price = this.calculatePrice(plan);
    const end_date = this.calculateEndDate(startDate, plan.duration);

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

  async index(req, res) {
    const { page = 1 } = req.body;

    const subscriptionList = await Subscription.findAll({
      order: ['start_date'],
      limit: 15,
      offset: (page - 1) * 15
    });

    return res.json(subscriptionList);
  }

  async update(req, res) {
    const { start_date } = req.body;

    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) {
      return res.status(404).json({ error: 'Plan does not exist' });
    }

    const price = this.calculatePrice(plan);
    const end_date = this.calculateEndDate(start_date, plan.duration);

    await subscription.update({
      price,
      end_date,
      ...req.body
    });

    subscription.save();

    return res.json({
      subscription
    });
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    await subscription.destroy();

    return res.json('Successfully deleted');
  }

  calculatePrice(plan) {
    return plan.price * plan.duration;
  }

  calculateEndDate(startDate, months) {
    return addMonths(parseISO(startDate), months);
  }
}

export default new SubscriptionController();
