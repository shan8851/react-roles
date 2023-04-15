import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  getJobs: protectedProcedure.input(z.object({
    skip: z.number().optional().default(0),
    take: z.number().optional().default(10),
  })).query(async ({ ctx, input }) => {
    const userJobs = await ctx.prisma.jobListing.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      skip: input.skip,
      take: input.take,
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
