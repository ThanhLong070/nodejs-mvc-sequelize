const homeService = require('../services/home');

exports.index = async (req, res) => {
  try {
    const { user } = req.session;
    
    const data = await homeService.getUser(user);

    return res.render('parts/home', {
      title: 'Trang chủ',
      data,
    });
    } catch (error) {
      throw error
    }
};