import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const { title, duration, price } = req.body;

    const plan = await Plan.create({
      title,
      duration,
      price
    });

    return res.json(plan);
  }

  async index(req, res) {
    const listPlans = await Plan.findAll({});

    return res.json(listPlans);
  }

  async update(req, res) {
    const plano = await Plan.findByPk(req.params.id);

    plano.update(req.body);

    const { title, duration, price } = plano;

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const plano = await Plan.findByPk(req.params.id);

    await plano.destroy(plano);

    return res.json({ message: 'Plan deleted successfully' });
  }
}

export default new PlanController();
