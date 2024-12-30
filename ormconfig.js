require("dotenv").config(); // Подключение dotenv для чтения переменных окружения

module.exports = {
  type: process.env.DB_TYPE || "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "test",
  synchronize: true, // Автоматическое создание таблиц (для разработки)
  logging: false,
  entities: ["src/models/**/*.js"], // Укажите путь к вашим моделям
};
