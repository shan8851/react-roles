import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getJobs: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.jobListing.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  deleteJob: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.jobListing.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
