import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.object({
    title: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(),
    remote: z.boolean().optional(),
  })).query(({ ctx, input }) => {
    return ctx.prisma.jobListing.findMany({
      where: {
        OR: [
          { title: { contains: input.title, mode: 'insensitive' } },
          { company: { contains: input.company, mode: 'insensitive' } },
          { location: { contains: input.location, mode: 'insensitive' } },
          { remote: input.remote }
        ]
      }
    });
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
      salaryMin: z.number(),
      salaryMax: z.number(),
      description: z.string(),
      tags: z.array(z.string()),
      location: z.string(),
      remote: z.boolean(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.jobListing.create({
        data: {
          company: input.company,
          title: input.title,
          salaryMin: input.salaryMin,
          salaryMax: input.salaryMax,
          description: input.description,
          tags: input.tags,
          location: input.location,
          userId: ctx.session.user.id,
        },
      });
    }),
});
