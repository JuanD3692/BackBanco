const authenticationMiddleware = (req, res, next) => {
    const userId = req.session.userId;
  
    if (!userId) {
      return res.status(401).json({ mensaje: 'Acceso no autorizado' });
    }
  
    next();
  };
  
  module.exports = authenticationMiddleware;
  