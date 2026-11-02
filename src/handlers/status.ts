import type { Context } from "grammy";
import { getLatestRun, type WorkflowRun } from "../github";

function describe(run: WorkflowRun): string {
    if (run.status !== "completed") {
        return `⏳ ${run.status ?? "выполняется"}`;
    }
    switch (run.conclusion) {
        case "success":
            return "✅ успешно";
        case "failure":
            return "❌ упал";
        default:
            return `⚠️ ${run.conclusion ?? "неизвестно"}`;
    }
}

export async function statusHandler(ctx: Context): Promise<void> {
    try {
        const run = await getLatestRun();

        if (!run) {
            await ctx.reply("Запусков тестов пока нет.");
            return;
        }

        const started = new Date(run.created_at).toLocaleString("ru-RU");
        const commit = run.head_sha.slice(0, 7);

        await ctx.reply(
            [
                `Статус: ${describe(run)}`,
                `Ветка: ${run.head_branch ?? "неизвестно"}`,
                `Коммит: ${commit}`,
                `Запущено: ${started}`,
                `Подробнее: ${run.html_url}`,
            ].join("\n")
        );
    } catch (error) {
        console.error("Status command failed:", error);
        await ctx.reply("Не удалось получить статус из GitHub. Попробуй позже.");
    }
}