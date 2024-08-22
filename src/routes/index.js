const express = require('express');
const { check } = require('express-validator');
const { createUser, editUser } = require('../controllers/user');
const validate = require('../helpers/validate');
const {
  createRewardHistory,
  readRewardHistory,
  deleteRewardHistory,
} = require('../controllers/reward-history');

const Router = express.Router();
Router.get('/', (req, res) => {
  res.json({
    message: 'OK',
    timestamp: new Date().toISOString(),
    IP: req.ip,
    URL: req.originalUrl,
  });
});
// Routes for user
Router.route('/create-user').post(
  [
    check('name').notEmpty().withMessage('Enter the name'),
    check('p5_balance').notEmpty().withMessage('Enter the p5_balance'),
  ],
  validate,
  createUser,
);

Router.route('/edit-user').post(
  [check('p5_balance').notEmpty().withMessage('Enter the p5_balance')],
  validate,
  editUser,
);

// Routes for reward history
Router.route('/create-reward').post(
  [
    check('points').notEmpty().withMessage('Enter the points'),
    check('given_by').notEmpty().withMessage('Enter the given_by'),
    check('given_to').notEmpty().withMessage('Enter the given_to'),
  ],
  validate,
  createRewardHistory,
);

Router.route('/read-reward').get(readRewardHistory);

Router.route('/delete-reward/:id').delete(deleteRewardHistory);

module.exports = Router;
