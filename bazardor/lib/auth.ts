import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  trustedOrigins: [
    "http://localhost:3001",
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL || "",
  ].filter(Boolean),
});
