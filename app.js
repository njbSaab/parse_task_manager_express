require("reflect-metadata"); // Для работы TypeORM
const { DataSource } = require("typeorm");
const express = require("express");
require("dotenv").config();
const scheduleParserTask = require("./utils/scheduleParser");

const app = express();
const PORT = process.env.PORT || 3333;

// Подключение к базе данных
const AppDataSource = new DataSource(require("./ormconfig"));

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL with TypeORM");

    // Middleware
    app.use(express.json());

    // Настройка задачи парсинга
    // URL для парсинга
    const url = "https://jsonplaceholder.typicode.com";
    // Контент для поиска
    const content = "Free fake and reliable API for testing and prototyping.";
    // Интервал
    const interval = "1m";
    // Запуск планировщика
    scheduleParserTask(url, content, interval);

    // Запуск сервера
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error during DataSource initialization:", error);
  });