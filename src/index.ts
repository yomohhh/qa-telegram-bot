import "dotenv/config";
import { Bot } from "grammy";
import { requireOwner } from "./auth";
import { statusHandler } from "./handlers/status";

const token = process.env.BOT_TOKEN;
if (!token) {
    throw new Error("BOT_TOKEN is not set in .env");
}

const bot = new Bot(token);


bot.command("start", (ctx) => ctx.reply("Bot is alive"));
bot.command("status", statusHandler);

bot.command("report", (ctx) =>
    ctx.reply("Allure-отчёт: https://yomohhh.github.io/QA_Project/")
);

bot.start();