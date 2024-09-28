import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { handle } from "hono/vercel";
import { createClient } from "@/utils/supabase/server";
export const dynamic = "force-dynamic";

const getUser = async () => {
  const supabase = createClient();
  const res = await supabase.auth.getUser();

  return {
    user: res.data.user,
    error: res.error,
  };
};

const rooms = new Hono().post(
  "/join",
  zValidator(
    "json",
    z.object({
      name: z.string().min(1),
      password: z.string().min(1),
    })
  ),
  async (c) => {
    const { user } = await getUser();
    console.log("USER -->>", user?.email);
    return c.json({ message: "Room created" });
  }
);

const app = new Hono()
  .basePath("/api")
  // MIDDLEWARE
  .use("*", logger())
  .use("*", prettyJSON())
  // ROUTES
  .route("/rooms", rooms);

export type APIType = typeof app;

export const OPTIONS = handle(app);
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
