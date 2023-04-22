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
          { company: { companyName: { contains: input.company, mode: "insensitive" } } },
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
          { company: { companyName: { contains: input.company, mode: "insensitive" } } },
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
  .input(
    z.object({
      title: z.string(),
      salaryMin: z.number(),
      salaryMax: z.number(),
      description: z.string(),
      tags: z.array(z.string()),
      location: z.string(),
      remote: z.boolean(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Find the user from the session
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });

    // Check if the user is an employer
    if (user?.role !== 'EMPLOYER') {
      throw new Error('Only employers can create job listings');
    }

    const userCompany = await ctx.prisma.company.findUnique({
      where: { userId: ctx.session.user.id },
    });

    if (!userCompany) {
      throw new Error('Company not found for the user');
    }

    return ctx.prisma.jobListing.create({
      data: {
        title: input.title,
        salaryMin: input.salaryMin,
        salaryMax: input.salaryMax,
        description: input.description,
        tags: input.tags,
        location: input.location,
        remote: input.remote,
        company: {
          connect: {
            userId: userCompany.userId,
          },
        },
      },
    });
  }),
  addView: publicProcedure
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
  addApply: publicProcedure
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
