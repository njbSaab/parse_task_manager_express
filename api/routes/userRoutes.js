const express = require("express");
const AppDataSource = require("../../config/database");
const User = require("../../models/userModel");

const router = express.Router();

router.post("/save", async (req, res) => {
  const userData = req.body;

  if (!userData || !userData.id) {
    console.error("Недостаточно данных для сохранения пользователя.");
    return res
      .status(400)
      .json({ success: false, error: "Недостаточно данных" });
  }

  try {
    // Проверяем, инициализирован ли AppDataSource
    if (!AppDataSource || !AppDataSource.isInitialized) {
      console.log("Повторная инициализация AppDataSource...");
      await AppDataSource.initialize();
    }

    const userRepo = AppDataSource.getRepository(User);

    let user = await userRepo.findOne({ where: { telegram_id: userData.id } });

    if (!user) {
      user = userRepo.create({
        telegram_id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        languageCode: userData.language_code,
      });
    } else {
      user.first_name = userData.first_name;
      user.last_name = userData.last_name;
      user.username = userData.username;
      user.languageCode = userData.language_code;
    }

    await userRepo.save(user);

    console.log("Пользователь успешно сохранен:", user);
    res.json({ success: true, user });
  } catch (error) {
    console.error("Ошибка при сохранении пользователя:", error);
    res.status(500).json({ success: false, error: "Ошибка сервера" });
  }
});

module.exports = router;
