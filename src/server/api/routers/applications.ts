import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const applicationRouter = createTRPCRouter({
  applicationsByCompany: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });

    if (user?.role !== 'COMPANY') {
      throw new Error('Only companies can access applications');
    }

    const company = await ctx.prisma.company.findUnique({
      where: { userId: ctx.session.user.id },
    });

    if (!company) {
      throw new Error('Company not found for the user');
    }

    return ctx.prisma.jobApplication.findMany({
      where: {
        companyId: company.userId,
      },
      include: {
        jobSeeker: {
          include: {
            user: true,
          },
        },
        jobListing: true,
      },
    });
  }),
  applyForJob: protectedProcedure
    .input(
      z.object({
        jobId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (user?.role !== 'JOB_SEEKER') {
        throw new Error('Only job seekers can apply for jobs');
      }

      const jobSeeker = await ctx.prisma.jobSeeker.findUnique({
        where: { userId: ctx.session.user.id },
      });

      if (!jobSeeker) {
        throw new Error('Job seeker not found for the user');
      }

      const jobListing = await ctx.prisma.jobListing.findUnique({
        where: { id: input.jobId },
      });

      if (!jobListing) {
        throw new Error('Job listing not found');
      }
      // Update the apply count first
      await ctx.prisma.jobListing.update({
        where: {
          id: input.jobId,
        },
        data: {
          applyClicked: {
            increment: 1,
          },
        },
      });
      // create job application
      return ctx.prisma.jobApplication.create({
        data: {
          jobSeeker: {
            connect: {
              userId: jobSeeker.userId,
            },
          },
          jobListing: {
            connect: {
              id: jobListing.id,
            },
          },
          company: {
            connect: {
              userId: jobListing.companyUserId,
            },
          },
        },
        include: {
          jobSeeker: {
            include: {
              user: true,
            },
          },
          jobListing: true,
          company: true,
        },
      });
    }),
  applicationsByUser: protectedProcedure
    .input(
      z.object({
        jobSeekerUserId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const applications = await ctx.prisma.jobApplication.findMany({
        where: { jobSeeker: { userId: input.jobSeekerUserId } },
      });
      return applications;
    }),
})
