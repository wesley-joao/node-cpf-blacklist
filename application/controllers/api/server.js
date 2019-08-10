const sequelize = require('../../config/database');
const watchingQueries = require('../../config/watchingQueries');

const Blacklist = sequelize.import('../../models/Blacklist');
const uptimeUtility = require('../../utility/uptimeUtility');
const memoryUtility = require('../../utility/memoryUtility');

exports.getStatus = async (req, res) => {
  const cpfsOnBlacklist = await Blacklist.count();
  res.status(200).json({
    uptime: uptimeUtility.humanizeUptime(),
    memoryUsed: memoryUtility.getMemoryUsed(),
    queriesExecuted: watchingQueries.queriesExecuted,
    cpfsOnBlacklist,
  });
};
