const Sequelize = require('sequelize');
const watchingQueries = require('./watchingQueries');

const sequelize = new Sequelize('sqlite://./database/db.sqlite', {
  countQueries: () => {
    watchingQueries.queriesExecuted += 1;
  },
});

sequelize.sync();

module.exports = sequelize;
