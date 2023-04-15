import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { jobRouter } from "~/server/api/routers/jobs";
import { profileRouter } from "./routers/profile";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  jobs: jobRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
