import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.STRING,
        peso: Sequelize.DECIMAL,
        altura: Sequelize.DECIMAL
      },
      {
        sequelize
      }
    );

    return this;
  }
}

export default Student;
