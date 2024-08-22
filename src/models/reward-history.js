const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RewardHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  RewardHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      points: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      given_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      given_to: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        field: 'createdat',
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updatedat',
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'RewardHistory',
      tableName: 'reward_history',
    },
  );
  return RewardHistory;
};
