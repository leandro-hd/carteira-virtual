import { Sequelize } from 'sequelize';

const databaseConfig = require('../config/database');

import User from '../models/User';
import Transaction from '../models/Transaction';

const connection = new Sequelize(databaseConfig);

User.init(connection);
Transaction.init(connection);
Transaction.associate(connection.models);

export { connection };