const authService = require('../services/auth');
const User = require('../models/User');
const { compare } = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { body } = req;

    console.log('Body:', body);
  
    const data = await authService.register(body);

    return res.json({ ...DATA, data });
  } catch (error) {
    throw error;
  }
};

exports.getLogin = (req, res) => {
  return res.render('parts/login');
};

exports.postLogin = async (req, res) => {
  try {
    const { body } = req;

    console.log('Body:', body);

    const user = await User.findOne({ where: { email: body.email } });
    if (!user) return 'User is not exist';
    const isTruePassword = await compare(body.password, user.password);
    if (!isTruePassword) return 'Password is not found!';

    req.session.user = user;
    return res.send(user);  
  } catch (error) {
    throw error;
  }
};

exports.logout = async (req, res, next) => {
  try {
    if (req.session.user && req.cookies.nodeMvc) {
      res.clearCookie('nodeMvc');
      res.redirect('/');
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    throw error
  }
};