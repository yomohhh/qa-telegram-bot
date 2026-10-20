import "dotenv/config";
import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) {
    throw new Error("BOT_TOKEN is not set in .env");
}

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("Bot is alive"));

bot.start();