import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getJobs: protectedProcedure.query(async ({ ctx }) => {
    const userJobs = await ctx.prisma.jobListing.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    const totalCount = await ctx.prisma.jobListing.count({
      where: {
        userId: ctx.session.user.id,
      }
    })
    return { userJobs, totalCount }
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
