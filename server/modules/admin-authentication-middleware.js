const rejectUnauthenticatedAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
      
      next();
    } else {
      
      res.sendStatus(403);
    }
  }

  module.exports = { rejectUnauthenticatedAdmin };