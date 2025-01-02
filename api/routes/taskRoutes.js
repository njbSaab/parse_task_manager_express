const express = require("express");
const router = express.Router();
const scheduleParserTask = require("../../utils/scheduleParser");
/**
 * POST /api/tasks/parser
 * Устанавливает задачу для парсинга.
 */
router.post("/parser", async (req, res) => {
  console.log("Body received:", req.body);

  const { url, content, interval } = req.body;
  if (!url || !content || !interval) {
    console.error("Некорректные данные:", req.body);
    return res
      .status(400)
      .json({ error: "Все поля (url, content, interval) обязательны." });
  }

  try {
    console.log("Запуск задачи парсинга через API...");
    await scheduleParserTask(url, content, interval); // Планируем задачу

    res.status(200).json({
      message: "Задача парсинга успешно запланирована.",
      url,
      content,
      interval,
    });
  } catch (error) {
    console.error("Ошибка при задании задачи парсинга:", error.message);
    res.status(500).json({ error: "Ошибка при задании задачи парсинга" });
  }
});

module.exports = router;
