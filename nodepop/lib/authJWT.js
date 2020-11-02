/* eslint-disable strict,lines-around-directive,consistent-return */
'use strict';

const jwt = require('jsonwebtoken');

module.exports = function () {
  return (req, res, next) => {
    const jwtToken = req.get('Authorize') || req.query.token || req.body.token;
    if (!jwtToken) {
      const error = res.status(401).json({
        mensaje: 'No existe Token',
        status: 401,
      });
      return next(error);
    }
    jwt.verify(jwtToken, process.env.PRIVATEJWT_SECRET, (err, payload) => {
      if (err) {
        err = res.status(401).json({
          mensaje: 'El Token ha sido modificado',
          status: 401,
        });
        return next(err);
      }
      req.sessionIdApi = payload.id;
      next();
    });
  };
};
