import type { Context } from "grammy";

const ownerId = Number(process.env.OWNER_ID);
if (!Number.isInteger(ownerId) || ownerId <= 0) {
    throw new Error("OWNER_ID must be a positive number in .env");
}

export function isOwner(ctx: Context): boolean {
    return ctx.from?.id === ownerId;
}

export async function requireOwner(
    ctx: Context,
    next: () => Promise<void>
): Promise<void> {
    if (!isOwner(ctx)) {
        await ctx.reply("Команда доступна только владельцу.");
        return;
    }
    await next();
}