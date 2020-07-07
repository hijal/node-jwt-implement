const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("jwt", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;