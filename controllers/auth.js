const authService = require('../services/auth');

exports.register = async (req, res) => {
  try {
    const { body } = req;

    console.log('Body:', body);
  
    const data = await authService.register(body);

    return res.json({ data });
  } catch (error) {
    throw error;
  }
};

exports.getLogin = (req, res) => {
  return res.render('parts/login');
};

exports.postLogin = async (req, res) => {
  try {
    const { session, body } = req;

    const data = await authService.checkUser(session, body);

    return res.send(data);  
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