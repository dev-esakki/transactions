/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reward_history', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      points: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      given_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      given_to: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdat: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedat: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('reward_history');
  },
};
