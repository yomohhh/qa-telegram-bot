import "dotenv/config";
import { Bot } from "grammy";
import { requireOwner } from "./auth";

const token = process.env.BOT_TOKEN;
if (!token) {
    throw new Error("BOT_TOKEN is not set in .env");
}

const bot = new Bot(token);

// Публичная команда: доступна всем
bot.command("start", (ctx) => ctx.reply("Bot is alive"));

// Защищённая команда: только владелец
bot.command("secret", requireOwner, (ctx) =>
    ctx.reply("Ты владелец, доступ есть ✅")
);

bot.start();