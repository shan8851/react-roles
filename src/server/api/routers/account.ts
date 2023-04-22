import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  setUserRole: protectedProcedure.input(z.object({
    role: z.enum(["JOB_SEEKER", "COMPANY"]),
    companyName: z.string().optional(),
    name: z.string().optional(),
  })).mutation(async ({ ctx, input }) => {
    // Update the user's role
    const updatedUser = await ctx.prisma.user.update({
      where: { id: ctx.session.user.id },
      data: { role: input.role },
    });

    if (input.role === "COMPANY") {
      // Create a new company associated with the user
      const newCompany = await ctx.prisma.company.create({
        data: {
          companyName: input.companyName!,
          // Add other company fields
          user: { connect: { id: ctx.session.user.id } },
        },
      });

      return { updatedUser, newCompany };
    } else if (input.role === "JOB_SEEKER") {
      // Create a new job seeker associated with the user
      const newJobSeeker = await ctx.prisma.jobSeeker.create({
        data: {
          name: input.name!,
          user: { connect: { id: ctx.session.user.id } },
        },
      });

      return { updatedUser, newJobSeeker };
    } else {
      throw new Error("Invalid role");
    }
  }),
    getCompanyData: protectedProcedure.query(async ({ ctx }) => {
    // Fetch the company data associated with the user
    const companyData = await ctx.prisma.company.findUnique({
      where: { userId: ctx.session.user.id },
      include: { user: true },
    });

    return companyData;
  }),
})
