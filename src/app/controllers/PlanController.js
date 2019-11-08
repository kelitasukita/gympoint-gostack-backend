import Planos from '../models/Plans';

class Plan {
  async store(req, res) {
    const { title, duration, price } = req.body;

    const plan = await Planos.create({
      title,
      duration,
      price
    });

    return res.json(plan);
  }

  async index(req, res) {
    const listPlans = await Planos.findAll({});

    return res.json(listPlans);
  }

  async update(req, res) {
    const plano = await Planos.findByPk(req.params.id);

    plano.update(req.body);

    const { title, duration, price } = plano;

    return res.json({ title, duration, price });
  }

  async delete(req, res) {
    const plano = await Planos.findByPk(req.params.id);

    await plano.destroy(plano);

    return res.json('Plano deletado com sucesso');
  }
}

export default new Plan();
