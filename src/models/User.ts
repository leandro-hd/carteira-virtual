const { Model, DataTypes } = require('sequelize');

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING
    }, {
      sequelize
    })
  }
}