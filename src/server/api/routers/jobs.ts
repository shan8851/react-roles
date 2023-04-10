import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.jobListing.findMany();
  }),
    create: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string(), requirements: z.string(), location: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.jobListing.create({
        data: {
          title: input.title,
          description: input.description,
          requirements: input.requirements,
          location: input.location,
          userId: ctx.session.user.id,
        },
      });
    }),
});
