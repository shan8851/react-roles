import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const jobRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.object({
    title: z.string().optional(),
    company: z.string().optional(),
    location: z.string().optional(),
    remote: z.boolean().optional(),
    skip: z.number().optional().default(0),
    take: z.number().optional().default(10),
  })).query(async ({ ctx, input }) => {
    const jobListings = await ctx.prisma.jobListing.findMany({
      where: {
        OR: [
          { title: { contains: input.title, mode: "insensitive" } },
          { company: { contains: input.company, mode: "insensitive" } },
          { location: { contains: input.location, mode: "insensitive" } },
          { remote: input.remote },
        ],
      },
      skip: input.skip,
      take: input.take,
    });
    const totalCount = await ctx.prisma.jobListing.count({
      where: {
        OR: [
          { title: { contains: input.title, mode: "insensitive" } },
          { company: { contains: input.company, mode: "insensitive" } },
          { location: { contains: input.location, mode: "insensitive" } },
          { remote: input.remote },
        ],
      },
    });
    return { jobListings, totalCount };
  }),

  getJob: publicProcedure.input(z.object({
    id: z.string(),
  })).query(({ ctx, input }) => {
    return ctx.prisma.jobListing.findUnique({
      where: {
        id: input.id
      }
    })
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
  addView: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.jobListing.update({
        where: {
          id: input.id,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }),
  addApply: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.jobListing.update({
        where: {
          id: input.id,
        },
        data: {
          applyClicked: {
            increment: 1,
          },
        },
      });
    }),

});
