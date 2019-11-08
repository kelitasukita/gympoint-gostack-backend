import Sequelize from 'sequelize';

import Admin from '../app/models/Admin';
import Students from '../app/models/Students';
import Planos from '../app/models/Plans';

import databaseConfig from '../config/database';

const models = [Admin, Students, Planos];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
