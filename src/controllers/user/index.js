const db = require('../../models');

async function createUser(req, res) {
  try {
    const { name, p5_balance } = req.body;
    if (p5_balance > 100) {
      throw new Error('P5 balance cannot be greater than 100');
    }
    const response = await db.User.findOne({ where: { name } });
    if (response) {
      return res.status(400).json({ message: 'User already exist' });
    }
    await db.User.create({ name, p5_balance });
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error?.message });
  }
}

async function editUser(req, res) {
  try {
    const { p5_balance } = req.body;
    const { id } = req.params;
    await db.User.update({ p5_balance }, { where: { id } });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error?.message });
  }
}

module.exports = {
  createUser,
  editUser,
};
