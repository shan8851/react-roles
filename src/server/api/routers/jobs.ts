import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const jobRouter = createTRPCRouter({
getAll: publicProcedure.input(z.object({
  title: z.string().optional(),
})).query(({ ctx, input }) => {
  console.log(input.title)
  return ctx.prisma.jobListing.findMany({ where: {
    title: {
      contains: input.title, mode: 'insensitive'
    }
  } });
}),


  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.jobListing.delete({
        where: {
          id: input.id,
        },
      });
    }),
  create: protectedProcedure
    .input(z.object({
      company: z.string(),
      title: z.string(),
      salary: z.number(),
      description: z.string(),
      requirements: z.string(),
      location: z.string(),
      remote: z.boolean(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.jobListing.create({
        data: {
          company: input.company,
          title: input.title,
          salary: input.salary,
          description: input.description,
          requirements: input.requirements,
          location: input.location,
          userId: ctx.session.user.id,
        },
      });
    }),
});
