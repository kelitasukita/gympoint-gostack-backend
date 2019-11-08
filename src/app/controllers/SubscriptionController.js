import { addMonths, parseISO } from 'date-fns';
import Subscription from '../models/Subscription';
import Plan from '../models/Plan';

class SubscriptionController {
  async store(req, res) {
    const { startDate, planId, studentId } = req.body;

    const plan = await Plan.findByPk(planId);

    const price = plan.duration * plan.price;
    const end_date = addMonths(parseISO(startDate), plan.duration);

    const subscription = await Subscription.create({
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
      end_date,
      price
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
