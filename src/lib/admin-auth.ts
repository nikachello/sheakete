import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export async function requireAdmin() {
  const password = process.env.ADMIN_PASSWORD;
  const provided = Buffer.from((await cookies()).get("admin_access")?.value ?? "");
  const expected = Buffer.from(password ?? "");
  if (!password || provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    throw new Error("Unauthorized");
  }
}
