require("reflect-metadata"); // Для работы TypeORM
const { DataSource } = require("typeorm");
const express = require("express");
const cors = require("cors"); // Импортируем CORS
require("dotenv").config();
const taskRoutes = require("./api/routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3333;

// Настройка CORS
app.use(cors({ origin: "http://localhost:5173" })); // Разрешаем запросы с клиента

// Подключение к базе данных
const AppDataSource = new DataSource(require("./ormconfig"));

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL with TypeORM");

    // Middleware
    app.use(express.json());

    // Подключение маршрутов
    app.use("/api/tasks", taskRoutes);

    // Запуск сервера
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error during DataSource initialization:", error);
  });
