const constants = require('../../config/constants');

module.exports = (req, res) => {
  res.render('pages/index.ejs', {
    apiUrl: `${constants.API_V1}/cpf/`,
  });
};
