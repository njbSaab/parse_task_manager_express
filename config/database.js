const { DataSource } = require("typeorm");
const ormconfig = require("../ormconfig");

const AppDataSource = new DataSource(ormconfig);

AppDataSource.initialize()
  .then(() => {
    console.log("База данных подключена.");
  })
  .catch((err) => {
    console.error("Ошибка подключения к базе данных:", err);
  });

module.exports = AppDataSource;
