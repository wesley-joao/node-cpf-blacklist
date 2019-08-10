const sequelize = require('../../config/database');
const watchingQueries = require('../../config/watchingQueries');

const Blacklist = sequelize.import('../../models/Blacklist');
const uptimeUtility = require('../../utility/uptimeUtility');
const memoryUtility = require('../../utility/memoryUtility');

module.exports = async (req, res) => {
  const cpfsOnBlacklist = await Blacklist.count();
  res.render('pages/status', {
    uptime: uptimeUtility.humanizeUptime(),
    memoryUsed: memoryUtility.getMemoryUsed(),
    queriesExecuted: watchingQueries.queriesExecuted,
    cpfsOnBlacklist,
  });
};
