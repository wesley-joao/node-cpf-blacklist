const constants = require('../../application/config/constants');

exports.get404 = (req, res) => {
  if (req.url.search('/api/v1') === 0) {
    return res.status(404).json({ msg: constants.REQUEST_NOT_FOUND });
  }
  res.status(404).render('pages/404');
};

exports.internalServerError = (req, res) => {
  res.status(500).json({ msg: constants.INTERNAL_SERVER_ERROR });
};
