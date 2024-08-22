const { Op } = require('sequelize');
const db = require('../../models');

async function createRewardHistory(req, res) {
  try {
    const { points, given_by, given_to } = req.body;
    const getUsers = await db.User.findAll({
      where: {
        id: {
          [Op.in]: [given_by, given_to],
        },
      },
    });
    const getCurrentUser = getUsers.find((x) => x.id === given_by);
    const getOtherUser = getUsers.find((x) => x.id === given_to);
    if (!getCurrentUser || !getOtherUser) {
      throw new Error('User not found');
    }
    if (points > getCurrentUser.p5_balance) {
      throw new Error('Insufficient balance');
    } else {
      await db.User.update(
        { p5_balance: getCurrentUser.p5_balance - points },
        { where: { id: given_by } },
      );
      await db.User.update(
        { reward_balance: getOtherUser.reward_balance + points },
        { where: { id: given_to } },
      );
      await db.RewardHistory.create({ points, given_by, given_to });
    }
    res.status(200).json({ message: 'Reward history created successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error?.message });
  }
}

async function readRewardHistory(req, res) {
  try {
    const response = await db.RewardHistory.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ message: error?.message });
  }
}

async function deleteRewardHistory(req, res) {
  try {
    const { id } = req.params;
    const transactionExist = await db.RewardHistory.findOne({ where: { id } });
    if (!transactionExist) {
      throw new Error('Transaction not found');
    }
    const getUsers = await db.User.findAll({
      where: {
        id: {
          [Op.in]: [transactionExist.given_by, transactionExist.given_to],
        },
      },
    });
    const getCurrentUser = getUsers.find((x) => x.id === transactionExist.given_by);
    const getOtherUser = getUsers.find((x) => x.id === transactionExist.given_to);
    await db.User.update(
      { p5_balance: getCurrentUser.p5_balance + transactionExist.points },
      { where: { id: transactionExist.given_by } },
    );
    await db.User.update(
      { reward_balance: getOtherUser.reward_balance - transactionExist.points },
      { where: { id: transactionExist.given_to } },
    );
    await db.RewardHistory.destroy({ where: { id } });
    res.status(200).json({ message: 'Reward history deleted successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error?.message });
  }
}

module.exports = {
  createRewardHistory,
  readRewardHistory,
  deleteRewardHistory,
};
