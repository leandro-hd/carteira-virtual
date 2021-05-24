const { Model, DataTypes } = require('sequelize');

export default class Transaction extends Model {
  static init(sequelize) {
    super.init({
      value: DataTypes.INTEGER,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      is_input: DataTypes.BOOLEAN,
      is_friend: DataTypes.BOOLEAN
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id_by' });
    this.belongsTo(models.User, { foreignKey: 'user_id_from' });
  }
}