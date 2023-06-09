import { createTRPCRouter } from "~/server/api/trpc";
import { jobRouter } from "~/server/api/routers/jobs";
import { profileRouter } from "./routers/profile";
import { accountRouter } from "./routers/account";
import { applicationRouter } from "./routers/applications";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  jobs: jobRouter,
  profile: profileRouter,
  account: accountRouter,
  application: applicationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
