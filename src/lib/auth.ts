import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", etc.
  }),
  emailAndPassword: {
    enabled: true,
    // Required minimum password length
    minPasswordLength: 6,
    // Maximum password length
    maxPasswordLength: 128,
    // Auto sign in after sign up (default: true)
    autoSignIn: true,
    // Require email verification before sign in (default: false)
    requireEmailVerification: false,
    // Revoke other sessions on password reset (default: false)
    revokeSessionsOnPasswordReset: false,
    // Reset password token expiration in seconds (default: 3600)
    resetPasswordTokenExpiresIn: 3600,
  },
  // Add social providers if env variables exist
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    // Add more providers as needed
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // },
  },
});