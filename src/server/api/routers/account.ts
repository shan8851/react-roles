import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  updateUserToCompany: protectedProcedure.input(z.object({
    companyName: z.string(),
  })).mutation(async ({ ctx, input }) => {
    console.log('attempting to update')
    console.log('User ID:', ctx.session.user.id);
  console.log('Input:', input);
    // Update the user's role to COMPANY
    const updatedUser = await ctx.prisma.user.update({
      where: { id: ctx.session.user.id },
      data: { role: "COMPANY" },
    });
    console.log('Updated User:', updatedUser);

    // Create a new company associated with the user
    const newCompany = await ctx.prisma.company.create({
      data: {
        companyName: input.companyName,
        // Add other company fields
        user: { connect: { id: ctx.session.user.id } },
      },
    });
    console.log('New Company:', newCompany);

    return { updatedUser, newCompany };

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
