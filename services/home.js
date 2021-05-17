const User = require('../models/User');

exports.getUser = async (user) => {
  const getUser = await User.findByPk(user.id);
  return getUser;
};
