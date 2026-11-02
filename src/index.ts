import "dotenv/config";
import { Bot } from "grammy";
import { requireOwner } from "./auth";
import { statusHandler } from "./handlers/status";

const token = process.env.BOT_TOKEN;
if (!token) {
    throw new Error("BOT_TOKEN is not set in .env");
}

const bot = new Bot(token);

// Публичные команды: доступны всем
bot.command("start", (ctx) => ctx.reply("Bot is alive"));
bot.command("status", statusHandler);

// Защищённая команда: только владелец (позже здесь будет /run)
bot.command("secret", requireOwner, (ctx) =>
    ctx.reply("Ты владелец, доступ есть ✅")
);

bot.start();