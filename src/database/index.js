import Sequelize from 'sequelize';

import Admin from '../app/models/Admin';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Subscription from '../app/models/Subscription';
import Checkin from '../app/models/Checkin';
import HelpOrder from '../app/models/HelpOrder';

import databaseConfig from '../config/database';

const models = [Admin, Student, Plan, Subscription, Checkin, HelpOrder];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
