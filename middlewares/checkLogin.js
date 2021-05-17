module.exports= (req, res, next) => {
  if (req.session.user && req.cookies.nodeMvc) {
      next()
  } else {
      res.redirect('/auth/login')
  }    
};